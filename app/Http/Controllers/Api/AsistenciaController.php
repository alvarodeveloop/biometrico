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
      }else if($user->id_perfil === 1){
        $asis = Asistencia::get();
      }


      return response()->json($asis,200);
    }

    public function store(Request $request){
      $userToken = JWTAuth::user();

        //determinar el tipo de registro, si es entrada o salida
        $typeRegister = Asistencia::determinatedTypeRegister($request->id_trabajador);
        //crear el objeto de registro
        $asis = new Asistencia;
        $total_register = count($typeRegister);
        $aviable = true;
        if($total_register < 1){
          $asis->tipo_registro = 1;
        }else if($total_register > 0 && $total_register < 2){
          $asis->tipo_registro = 2;
        }else{
          $aviable = false;
        }
        if($aviable){
          // si es viable guardarlo
          $config = Config::get($userToken->id_ente)[0];
          $entrada_extra = $config->entrada_minuto_extra;
          $salida_extra = $config->salida_minuto_extra;

          $image = $request->imagen;
          $name_image = time().'.' . explode('/', explode(':', substr($image, 0, strpos($image, ';')))[1])[1];
          \Image::make($request->imagen)->save(public_path('images/asistencia/').$name_image);

          $asis->id_trabajador = $request->id_trabajador;
          $asis->imagen = $name_image;

          // buscar el turno del trabajador
          $trabajador = new Trabajador;
          $turno = $trabajador->getTurno($request->id_trabajador);
          $hora = date('H:i:s');
          $hora_entrada_extra = strtotime('+'.$entrada_extra.' minutes',strtotime($turno->desde));
          $hora_salida_extra = strtotime('+'.$salida_extra.' minutes',strtotime($turno->hasta));
          //determinar si llega temprano,tarde o se va temprano,tarde
          $tipo_llegada = false;
          $evaluate = $asis->tipo_registro === 1 ? strtotime($turno->desde) : strtotime($turno->hasta);
          $hora = strtotime($hora);

          if($asis->tipo_registro === 1){
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
        }else{
          return response()->json(['error' => 'Ya ha registrado su entrada y salida del día'],500);
        }


    }

    public function chart_statistic(){
      // función para las estadistcas del home
      $user = JWTAuth::user();

      if($user->id_perfil === 2){
        $late = Asistencia::stadistic_llegada($user->id_ente,null,null,false);
        $early = Asistencia::stadistic_llegada($user->id_ente,null,null,true);
      }elseif($user->id_perfil === 3){
        $late = Asistencia::stadistic_llegada($user->id_ente,$user->id_departamento,null,false);
        $early= Asistencia::stadistic_llegada($user->id_ente,$user->id_departamento,null,true);
      }elseif($user->id_perfil === 1){
        $late = Asistencia::stadistic_llegada(null,null,null,false);
        $early= Asistencia::stadistic_llegada(null,null,null,true);
      }

      return response()->json([
        'late' => $late,
        'early' => $early
      ],200);
    }

    public function asistencia_by_day(){

      //funcion para filtrar por el día de hoy

      $fecha = date('Y-m-d');

      $user = JWTAuth::user();
      if($user->id_perfil === 2){
        $asis = Asistencia::get($user->id_ente,null,null,null,null,$fecha);
      }elseif($user->id_perfil === 3){
        $asis = Asistencia::get($user->id_ente,$user->id_departamento,null,null,null,$fecha);
      }elseif($user->id_perfil === 1){
        $asis = Asistencia::get(null,null,null,null,null,$fecha);
      }

      return response()->json($asis,200);
    }

    public function asistencia_filter(Request $request){
      // función para filtrar por fecha desde la tabla
      $user = JWTAuth::user();
      $ente = "";
      $worker = "";

      if($request->id_ente && $user->id_perfil === 1){
        $ente = $request->id_ente;
      }else if($user->id_perfil !== 1){
        $ente = $user->id_ente;
      }

      $worker = $request->id_worker ? $request->id_worker : null;


      if($user->id_perfil === 2){
        $asis = Asistencia::get($ente,null,$worker,$request->desde,$request->hasta);
      }elseif($user->id_perfil === 3){
        $asis = Asistencia::get($ente,$user->id_departamento,$worker,$request->desde,$request->hasta);
      }else if($user->id_perfil === 1){
        $asis = Asistencia::get($ente,null,$worker,$request->desde,$request->hasta);
      }

      return response()->json($asis,200);
    }

    public function asistencia_by_cedula($cedula){
      //funcion para filtrar por trabajador desde su cedula
      $user = JWTAuth::user();

      $worker = Trabajador::where('cedula',$cedula)->first();
      if($worker){
        if($user->id_perfil === 2){
          $asis = Asistencia::get($user->id_ente,null,$worker->id);
        }elseif($user->id_perfil === 3){
          $asis = Asistencia::get($user->id_ente,$user->id_departamento,$worker->id);
        }elseif($user->id_perfil === 1){
          $asis = Asistencia::get(null,null,$worker->id);
        }
      }else{
        $asis = [];
      }

      return response()->json(
        [
          'asis' => $asis,
          'id_worker' => $worker->id
        ],200);
    }

    public function asistencia_by_ente($ente){
      $hoy = date('Y-m-d');
      $asis = Asistencia::get($ente,null,null,null,null,$hoy);
      return response()->json($asis,200);
    }
}
