<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Asistencia;
use JWTAuth;

class ReporteController extends Controller
{
    //
    public function reporteGeneral(Request $request){
      $user = JWTAuth::user();
      $desde = $request->desde;
      $hasta = $request->hasta;
      $trabajador = $request->id_trabajador;
      $status = $request->status;
      $llegada = $request->llegada;

      $user = JWTAuth::user();
      if($user->id_perfil === 2){
        $asis = Asistencia::get($user->id_ente,null,$trabajador,$desde,$hasta,null,$status,$llegada);
      }elseif($user->id_perfil === 3){
        $asis = Asistencia::get($user->id_ente,$user->id_departamento,$trabajador,$desde,$hasta,null,$status,$llegada);
      }else{
        $asis = Asistencia::get(null,null,$trabajador,$desde,$hasta,null,$status,$llegada);
      }
      return response()->json($asis,200);
    }
}
