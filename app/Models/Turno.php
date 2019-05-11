<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Turno extends Model
{
    //
    protected $table = "turno";
    protected $fillable = ['turno','desde','hasta','id_ente'];
    public $timestamps = false;
}
