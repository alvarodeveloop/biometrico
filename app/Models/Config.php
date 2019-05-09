<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Config extends Model
{
    //
    protected $table = "config";
    protected $fillable = ['entrada_minuto_extra','salida_minuto_extra','id_ente'];
    public $timestamps = false;

    public static function get($id_ente){
      return self::where('id_ente',$id_ente)->get();
    }
}
