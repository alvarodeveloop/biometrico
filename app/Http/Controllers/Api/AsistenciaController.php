<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Asistencia;
use App\Models\Trabajador;
use App\Models\Config;
use JWTAuth;
class AsistenciaController extends Controller
{
    //
    public function index(){
      $user = JWTAuth::user();
      if($user->id_perfil === 2){
        $asis = Asistencia::get($user->id_ente);
      }elseif($user->id_perfil === 3){
        $asis = Asistencia::get($user->id_ente,$user->id_departamento);
      }

      return response()->json($asis,200);
    }

    public function store(Request $request){
      $userToken = JWTAuth::user();
      $config = Config::get($userToken->id_ente)[0];
      $entrada_extra = $config->entrada_minuto_extra;
      $salida_extra = $config->salida_minuto_extra;

      $image = $request->imagen;
      $name_image = time().'.' . explode('/', explode(':', substr($image, 0, strpos($image, ';')))[1])[1];
      \Image::make($request->imagen)->save(public_path('images/asistencia/').$name_image);

        //determinar el tipo de registro, si es entrada o salida
        $typeRegister = Asistencia::determinatedTypeRegister($request->id_trabajador);
        //crear el objeto de registro
        $asis = new Asistencia;
        $asis->id_trabajador = $request->id_trabajador;
        $asis->imagen = $name_image;

        if(count($typeRegister) > 0){
          $asis->tipo_registro = true;
        }else{
          $asis->tipo_registro = false;
        }
        // buscar el turno del trabajador
        $trabajador = new Trabajador;
        $turno = $trabajador->getTurno($request->id_trabajador);
        $hora = date('H:i:s');
        $hora_entrada_extra = strtotime('+'.$entrada_extra.' minutes',strtotime($turno->desde));
        $hora_salida_extra = strtotime('+'.$salida_extra.' minutes',strtotime($turno->hasta));
        //determinar si llega temprano,tarde o se va temprano,tarde
        $tipo_llegada = false;
        $evaluate = !$asis->tipo_registro ? strtotime($turno->desde) : strtotime($turno->hasta);
        $hora = strtotime($hora);

        if(!$asis->tipo_registro){
          if($hora < $evaluate){
            $tipo_llegada = 0;
          }elseif($hora >= $evaluate && $hora <= $hora_entrada_extra){
            $tipo_llegada = 1;
          }elseif($hora > $hora_entrada_extra){
            $tipo_llegada = 2;
          }
        }else{
          if($hora < $evaluate){
            $tipo_llegada = 0;
          }elseif($hora >= $evaluate && $hora <= $hora_salida_extra){
            $tipo_llegada = 1;
          }elseif($hora > $hora_salida_extra){
            $tipo_llegada = 2;
          }
        }

        $asis->tipo_llegada = $tipo_llegada;

        //guardar
        $asis->save();
        return response()->json([],200);
    }

    public function chart_statistic(){
      $user = JWTAuth::user();

      if($user->id_perfil === 2){
        $late = Asistencia::stadistic_llegada($user->id_ente,null,null,false);
        $early = Asistencia::stadistic_llegada($user->id_ente,null,null,true);
      }elseif($user->id_perfil === 3){
        $late = Asistencia::stadistic_llegada($user->id_ente,$user->id_departamento,null,false);
        $early= Asistencia::stadistic_llegada($user->id_ente,$user->id_departamento,null,true);
      }

      return response()->json([
        'late' => $late,
        'early' => $early
      ],200);
    }

    public function asistencia_by_day(){
      $fecha = date('Y-m-d');

      $user = JWTAuth::user();
      if($user->id_perfil === 2){
        $asis = Asistencia::get($user->id_ente,null,null,null,null,$fecha);
      }elseif($user->id_perfil === 3){
        $asis = Asistencia::get($user->id_ente,$user->id_departamento,null,null,null,$fecha);
      }

      return response()->json($asis,200);
    }

    public function asistencia_filter(Request $request){

      $user = JWTAuth::user();
      if($user->id_perfil === 2){
        $asis = Asistencia::get($user->id_ente,null,null,$request->desde,$request->hasta);
      }elseif($user->id_perfil === 3){
        $asis = Asistencia::get($user->id_ente,$user->id_departamento,null,$request->desde,$request->hasta);
      }

      return response()->json($asis,200);
    }
}
