<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Departamento extends Model
{
    //
    protected $table = "departamento";
    protected $fillable = ['departamento','id_ente'];
    public $timestamps = false;

    public static function get($id_ente,$id_depar=null){
      $where = "users.id_ente = $id_ente and users.id_departamento IS NOT NULL";
      if($id_depar){
        $where.= " and users.id_departamento = $id_depar";
      }

      return self::join('users','users.id_departamento','=','departamento.id')
      ->select(
        'departamento.*','users.nombre','users.apellido','users.cedula',
        'users.telefono','users.direccion','users.email'
      )
      ->whereRaw($where)
      ->get();
    }
}
