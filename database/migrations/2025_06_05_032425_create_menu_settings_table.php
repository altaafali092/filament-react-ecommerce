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
        Schema::create('menu_settings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('menu_id')->nullable()->constrained('menu_settings')->nullOnDelete()->onUpdate('cascade');
            $table->string('title');
            $table->string('slug')->unique();
            $table->string('menu_type');
            $table->nullableMorphs('menuable');
            $table->string('menu_url')->nullable();
            $table->integer('position')->nullable(); // For ordering
            $table->boolean('is_active')->default(true);
            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('menu_settings');
    }
};
