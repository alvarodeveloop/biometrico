<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Ente extends Model
{
    //
    protected $table = "ente";
    protected $fillable = ['ente','direccion_ente'];
    public $timestamps = false;

    public static function get($id = null){
      if($id){
        return self::join('users','users.id_ente','=','ente.id')
        ->select(
          'ente.*','users.nombre','users.apellido','users.cedula',
          'users.telefono','users.direccion','users.email'
        )
        ->where('ente.id',$id)
        ->where('users.id_perfil',2)
        ->get();
      }else{
        return self::join('users','users.id_ente','=','ente.id')
        ->select(
          'ente.*','users.nombre','users.apellido','users.cedula',
          'users.telefono','users.direccion','users.email'
        )
        ->where('users.id_perfil',2)
        ->get();
      }
    }
}
