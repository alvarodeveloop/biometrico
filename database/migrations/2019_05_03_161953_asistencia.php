<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Asistencia extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::create('asistencia', function (Blueprint $table) {
          $table->bigIncrements('id');
          $table->integer('id_usuario');
          $table->string('foto');
          $table->boolean('turno')->default(false);
          $table->smallInteger('rango'); // 1 Temprano, 2 Normal, 3 Tarde
          $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
        Schema::dropIfExists('asistencia');
    }
}
