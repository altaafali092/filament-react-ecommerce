<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('menu_settings', function (Blueprint $table) {
            // for real models like Category
            $table->string('menuable_key')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('menu_settings', function (Blueprint $table) {
          // for real models like Category
            $table->string('menuable_key');
        });
    }
};
