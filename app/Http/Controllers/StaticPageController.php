<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class StaticPageController extends Controller
{
   public function show($slug)
   {
    return match ($slug) {
        'index' => app(FrontendController::class)->index(),
        'about' => view('pages.about'),
        'contact' => Inertia::render('Frontend.Contact.Index'),
        'terms' => view('pages.terms'),
        'privacy' => view('pages.privacy'),
        'blogs'=> Inertia::render('Frontend.Blogs.Index'),
        default => abort(404),
    };
   }
}
