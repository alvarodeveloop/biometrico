<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Trabajador extends Model
{
    //
    protected $table = "trabajador";
    protected $fillable = ['nombre','apellido','nacionalidad',
                          'cedula','direccion','telefono',
                        'email','imagen','id_cargo','id_turno','id_departamento',
                        'qrcode'];
    public $timestamps = false;

    public function getTurno($id = null){
      return self::where('trabajador.id',$id)
            ->select('turno.*')
            ->join('turno','turno.id','=','trabajador.id_turno')
            ->first();

    }
}
