<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolePermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create Roles

        $vendor = Role::create(['name' => 'vendor']);
        $user = Role::create(['name' => 'user']);

        // Create Permissions
        $permissions = [
            'create posts',
            'edit posts',
            'delete posts',
            'view admin dashboard'
        ];

        foreach ($permissions as $permission) {
            Permission::create(['name' => $permission]);
        }

        // Assign Permissions to Roles

        $vendor->givePermissionTo(['create posts', 'edit posts']);
        $user->givePermissionTo(['create posts']);
    }
}
