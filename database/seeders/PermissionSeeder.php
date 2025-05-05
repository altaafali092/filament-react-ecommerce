<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Define permissions
        $permissions = [
            'view users',
            'edit users',
            'delete users',
            'create users',

            'view permissions',
            'edit permissions',
            'delete permissions',
            'create permissions',

            'view blogs',
            'edit blogs',
            'delete blogs',
            'create blogs',

            'view roles',
            'edit roles',
            'delete roles',
            'create roles',

        ];

        // Create permissions
        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

  // Get all permissions
  $allPermissions = Permission::all();

  // Create or get the 'superadmin' role
  $superAdminRole = Role::firstOrCreate(['name' => 'superadmin']);

  // Assign all permissions to the 'superadmin' role
  $superAdminRole->syncPermissions($allPermissions);

    }
}
