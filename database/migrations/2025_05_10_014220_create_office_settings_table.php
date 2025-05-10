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
        Schema::create('office_settings', function (Blueprint $table) {
            $table->id();
            $table->string('office_logo');
            $table->string('office_name');
            $table->string('office_address');
            $table->string('office_phone');
            $table->string('office_email');
            $table->string('office_facebook')->nullable();
            $table->string('office_tiktok')->nullable();
            $table->string('office_youtube')->nullable();
            $table->string('office_instagram')->nullable();
            $table->string('office_whatsapp')->nullable();
            $table->foreignId('created_by')->nullable()->constrained('users')->cascadeOnDelete();
            $table->softDeletes();
         
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('office_settings');
    }
};
