<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cargo extends Model
{
    //
    protected $table = "cargo";
    protected $fillable = ['cargo','id_ente'];
    public $timestamps = false;
}
