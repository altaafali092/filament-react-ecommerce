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

        // 2. Create or update the Super Admin user
        $user = User::updateOrCreate(
            [
                'email' => 'admin@admin.com', // Unique email ensures only one Super Admin
            ],
            [
                'name' => 'Super Admin',

                'password' => bcrypt('password'), // Always use a secure password
            ]
        );

        // 3. Assign the Super Admin role to the Super Admin user
          $user->assignRole($superAdminRole);
          $permissions = Permission::all();
          $superAdminRole->syncPermissions($permissions);
    }
}
