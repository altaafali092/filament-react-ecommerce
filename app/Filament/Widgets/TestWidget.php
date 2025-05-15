<?php

namespace App\Filament\Widgets;

use App\Models\Order;
use App\Models\User;
use Carbon\Carbon;
use Filament\Facades\Filament;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class TestWidget extends BaseWidget
{

    protected function getUserRegistrationsChartData(): array
    {
        $data = [];
        // Loop over the past 7 days
        for ($i = 6; $i >= 0; $i--) {
            $date = Carbon::now()->subDays($i)->toDateString();
            $count = User::whereDate('created_at', $date)->count();
            $data[] = $count;
        }
        return $data;
    }

    protected function getTodayUserChartData(): array
    {
        $data = [];
        for ($hour = 0; $hour < 24; $hour++) {
            $start = Carbon::today()->addHours($hour);
            $end = (clone $start)->addHour();

            $count = User::whereBetween('created_at', [$start, $end])->count();

            $data[] = $count;
        }
        return $data;
    }
    protected function getVendorUsersChartData(): array
    {
        $data = [];
        for ($i = 6; $i >= 0; $i--) {
            $date = Carbon::now()->subDays($i)->toDateString();
            $count = User::whereDate('created_at', $date)
                ->whereHas('roles', fn($q) => $q->where('name', 'vendor'))
                ->count();
            $data[] = $count;
        }
        return $data;
    }

    protected function getTotalOrdersChartData(): array
    {
        $data = [];
        for ($i = 6; $i >= 0; $i--) {
            $date = Carbon::now()->subDays($i)->toDateString();
            $count = Order::whereDate('created_at', $date)
                ->count();
            $data[] = $count;
        }
        return $data;
    }
    protected function getVendorTotalOrdersChartData($vendorId): array
    {
        $data = [];
        for ($i = 6; $i >= 0; $i--) {
            $date = Carbon::now()->subDays($i)->toDateString();
            $count = Order::whereDate('created_at', $date)
                ->where('vendor_user_id', $vendorId)
                ->count();
            $data[] = $count;
        }
        return $data;
    }


    protected function getPendingOrdersChartData(): array
    {
        $data = [];
        // Loop over the past 7 days
        for ($i = 6; $i >= 0; $i--) {
            $date = Carbon::now()->subDays($i)->toDateString();
            $count = Order::whereDate('created_at', $date)->where('status', (['draft', 'pending', 'processing', 'vendor droped at store']))->count();
            $data[] = $count;
        }
        return $data;
    }

    protected function getOrderCancelChartData(): array
    {
        $data = [];
        // Loop over the past 7 days
        for ($i = 6; $i >= 0; $i--) {
            $date = Carbon::now()->subDays($i)->toDateString();
            $count = Order::whereDate('created_at', $date)->where('status', 'cancelled')->count();
            $data[] = $count;
        }
        return $data;
    }
    protected function getOrderCompletedChartData(): array
    {
        $data = [];
        // Loop over the past 7 days
        for ($i = 6; $i >= 0; $i--) {
            $date = Carbon::now()->subDays($i)->toDateString();
            $count = Order::whereDate('created_at', $date)->where('status', 'completed')->count();
            $data[] = $count;
        }
        return $data;
    }

    protected function getVendorTodayOrdersChartData($vendorId): array
    {
        $data = [];
        for ($hour = 0; $hour < 24; $hour++) {
            $start = Carbon::today()->addHours($hour);
            $end = (clone $start)->addHour();
            $count = Order::whereBetween('created_at', [$start, $end])->where('vendor_user_id', $vendorId)->count();
            
            $data[] = $count;
        }

        return $data;
    }
    protected function getTodayOrdersChartData(): array
    {
        $data = [];
        for ($hour = 0; $hour < 24; $hour++) {
            $start = Carbon::today()->addHours($hour);
            $end = (clone $start)->addHour();
            $count = Order::whereBetween('created_at', [$start, $end])->count();
            
            $data[] = $count;
        }

        return $data;
    }


    protected function getStats(): array
    {
        $user = Filament::auth()->user(); // or auth()->user();
        $stats = [];

        if ($user->hasRole('super_admin')) {
            $stats[] = Stat::make('Total Users', User::count())
                ->description('Total users registered in the system')
                ->descriptionIcon('heroicon-m-arrow-trending-up')
                ->chart($this->getUserRegistrationsChartData())
                ->color('success');

            $stats[] = Stat::make('Today\'s New Users', User::whereDate('created_at', Carbon::today())->count())
                ->description('Users joined today')
                ->descriptionIcon('heroicon-m-user-plus')
                ->chart($this->getTodayUserChartData())
                ->color('info');

            $stats[] = Stat::make('Total Vendor', User::role('vendor')->count()) // Use role() or whereHas if needed
                ->description('Total Vendor')
                ->descriptionIcon('heroicon-m-user-plus')
                ->chart($this->getVendorUsersChartData());
        }

      

        $user = Filament::auth()->user();
        
        if ($user->hasRole('vendor')) {
            $stats[] = Stat::make('Total Orders', Order::where('vendor_user_id', $user->id)->count())
                ->description('Your Total Orders')
                ->descriptionIcon('heroicon-o-shopping-bag')
                ->chart($this->getVendorTotalOrdersChartData($user->id))
                ->color('success');
        } else {
            $stats[] = Stat::make('Total Orders', Order::count())
                ->description('Total Orders')
                ->descriptionIcon('heroicon-o-shopping-bag')
                ->chart($this->getTotalOrdersChartData())
                ->color('success');
        }
        

      

        $stats[] = Stat::make('Orders in Process', Order::whereIn('status', ['draft', 'pending', 'vendor droped at store', 'processing'])->count())
            ->description('Order In Process')
            ->descriptionIcon('heroicon-o-shopping-bag')
            ->chart($this->getPendingOrdersChartData())
            ->color('warning');

        $stats[] = Stat::make('Orders Cancelled', Order::where('status', 'cancelled')->count())
            ->description('Order Cancelled')
            ->descriptionIcon('heroicon-o-shopping-bag')
            ->chart($this->getOrderCancelChartData())
            ->color('danger');

        $stats[] = Stat::make('Completed Orders', Order::where('status', 'completed')->count())
            ->description('Order Completed')
            ->descriptionIcon('heroicon-o-shopping-bag')
            ->chart($this->getOrderCompletedChartData())
            ->color('success');

        return $stats;
    }
}
