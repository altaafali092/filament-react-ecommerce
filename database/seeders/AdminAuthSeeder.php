<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class AdminAuthSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $superAdminRole = Role::firstOrCreate(['name' => 'superadmin']);

       $user=User::firstOrCreate([
            'name' => 'Super Admin',
            'email' => 'admin@admin.com',
            'role' => 'superadmin',
            'password' => bcrypt('password'),
        ]);

        $user->assignRole($superAdminRole);
        $permissions = Permission::all();
        // Assign all permissions to the superadmin role
        $superAdminRole->syncPermissions($permissions);
    }
}
