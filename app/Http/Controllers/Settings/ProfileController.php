<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Http\Requests\Settings\ProfileUpdateRequest;
use App\Http\Requests\Settings\ShippingAddressUpdateRequest;
use App\Http\Requests\Settings\VendorDetailUpdateRequest;
use App\Models\ShippingAddress;
use App\Models\Vendor;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;
use Psy\CodeCleaner\FunctionReturnInWriteContextPass;

class ProfileController extends Controller
{
    /**
     * Show the user's profile settings page.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('settings/profile', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => $request->session()->get('status'),
        ]);
    }

    /**
     * Update the user's profile settings.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return to_route('profile.edit');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }

    public function ShippingAddressPage()
    {
        $address = Auth::user()->shippingAddress;

        return Inertia::render('settings/ShippingAddress', [
            'shippingAddress' => $address,
        ]);
    }


    public function shippingAddressUpdate(ShippingAddressUpdateRequest $request)
    {
        $user = Auth::user();

        $shippingAddress = ShippingAddress::firstOrNew(['user_id' => $user->id]);
        $shippingAddress->fill($request->validated() + ['user_id' => $user->id]);
        $shippingAddress->save();
        return back()->with('success', 'Shipping address saved successfully.');
    }

    public function becomeVendor(){
        $vendor = Auth::user()->vendorDetail;
        return Inertia::render('settings/BecomeVendor',[
            'vendorDetail' => $vendor,
        ]);
    }

    // public function vedorDetailupdate(VendorDetailUpdateRequest $request)
    // {

    //     $user = Auth::user();    
    //     // Save or update vendor details
    //     $vendorDetail = Vendor::firstOrNew(['user_id' => $user->id]);
    //     $vendorDetail->fill($request->validated() + ['user_id' => $user->id]);

    //     if($request->hasFile('cover_image')){
    //         $path = Storage::disk('public')->put('vendor_cover_images', $request->file('cover_image'));
    //         $vendorDetail['cover_image'] = Storage::url($path); 
    //         // $vendorDetail->cover_image = $request->file('cover_image')->store('vendor_cover_images');
    //     }
    //     if($request->hasFile('citizenship_image')){
    //         $path = Storage::disk('public')->put('citizenship_image', $request->file('citizenship_image'));
    //         $vendorDetail['citizenship_image'] = Storage::url($path); 
    //     }
    //     if($request->hasFile('store_registration_doc')){
    //         $path = Storage::disk('public')->put('store_registration_doc', $request->file('store_registration_doc'));
    //         $vendorDetail['store_registration_doc'] = Storage::url($path); 
    //     }
    //     if($request->hasFile('other_document')){
    //         $path = Storage::disk('public')->put('other_document', $request->file('other_document'));
    //         $vendorDetail['other_document'] = Storage::url($path);
           
    //     }

    //     $vendorDetail->save();
    
    //     // Update user role if not already a vendor
    //     if ($user->role !== 'vendor') {
    //         $user->update([
    //             'role' => 'vendor',
    //         ]);
    //     }
        
    
    //     return back()->with('success', 'You are now registered as a vendor.');
    // }

    public function vedorDetailupdate(VendorDetailUpdateRequest $request)
{
    $user = Auth::user();
    
    // Save or update vendor details
    $vendorDetail = Vendor::firstOrNew(['user_id' => $user->id]);
    $vendorDetail->fill($request->validated() + ['user_id' => $user->id]);

    // Handle the cover image
    if ($request->hasFile('cover_image')) {
        // Delete old cover image if it exists
        if ($vendorDetail->cover_image) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $vendorDetail->cover_image));
        }

        // Store new cover image and get URL
        $path = Storage::disk('public')->put('cover_images', $request->file('cover_image'));
        $vendorDetail['cover_image'] = Storage::url($path);
    }

    // Handle the citizenship image
    if ($request->hasFile('citizenship_image')) {
        // Delete old citizenship image if it exists
        if ($vendorDetail->citizenship_image) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $vendorDetail->citizenship_image));
        }

        // Store new citizenship image and get URL
        $path = Storage::disk('public')->put('citizenship_image', $request->file('citizenship_image'));
        $vendorDetail['citizenship_image'] = Storage::url($path);
    }

    // Handle the store registration document
    if ($request->hasFile('store_registration_doc')) {
        // Delete old store registration document if it exists
        if ($vendorDetail->store_registration_doc) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $vendorDetail->store_registration_doc));
        }

        // Store new store registration document and get URL
        $path = Storage::disk('public')->put('store_registration_doc', $request->file('store_registration_doc'));
        $vendorDetail['store_registration_doc'] = Storage::url($path);
    }

    // Handle the other document
    if ($request->hasFile('other_document')) {
        // Delete old other document if it exists
        if ($vendorDetail->other_document) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $vendorDetail->other_document));
        }
        
        $path = Storage::disk('public')->put('other_document', $request->file('other_document'));
        $vendorDetail['other_document'] = Storage::url($path);
    }

    $vendorDetail->save();

    if ($user->role !== 'vendor') {
        $user->update([
            'role' => 'vendor',
        ]);
    }

    return back()->with('success', 'You are now registered as a vendor.');
}

    

}
