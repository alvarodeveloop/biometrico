<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Models\Trabajador;
use JWTAuth;
use QrCode;

class TrabajadorController extends Controller
{
    //
    public function index(){
      $user = JWTAuth::user();

      $sql = "trabajador.*,
                (SELECT turno from turno where id = trabajador.id_turno) as turno,
                (SELECT cargo from cargo where id = trabajador.id_cargo) as cargo";

      $worker = Trabajador::select(DB::raw($sql))->
                where('id_departamento',$user->id_departamento)
                ->get();
      return response()->json($worker,200);
    }

    public function store(Request $request){

      $request->validate([
        'email' => 'unique:trabajador',
        'cedula' => 'unique:trabajador'
      ]);

      $userToken = JWTAuth::user();

      $trabajador = new Trabajador;
      $trabajador->fill($request->all());
      $trabajador->id_departamento = $userToken->id_departamento;
      $name_image = null;

      if($request->imagen){
        $image = $request->imagen;
        $name_image = time().'.' . explode('/', explode(':', substr($image, 0, strpos($image, ';')))[1])[1];
        \Image::make($request->imagen)->save(public_path('images/trabajador/').$name_image);

      }

      $trabajador->imagen = $name_image;
      $name = time().'.png';

      if($trabajador->save()){

        QrCode::format('png')
        ->size(500)
        ->generate($trabajador->id, public_path('images/trabajador/qrcode/'.$name));

        $trabajador->qrcode = $name;
        $trabajador->update();
        return response()->json([],200);
      }else{
        return response()->json(['error' => "contacte con soporte"],500);
      }
    }

    public function show($id){
      $res = Trabajador::find($id);
      return response()->json($res,200);
    }

    public function update(Request $request,$id){
      $userToken = JWTAuth::user();

      $trabajador = Trabajador::find($id);
      if($request->imagen && $request->imagen !== $trabajador->imagen){
        if($trabajador->imagen){
          unlink(public_path('images/trabajador/'.$trabajador->imagen));
        }
      }

      $name_image = null;

      if($request->imagen && $request->imagen !== $trabajador->imagen){
        $image = $request->imagen;
        $name_image = time().'.' . explode('/', explode(':', substr($image, 0, strpos($image, ';')))[1])[1];
        \Image::make($request->imagen)->save(public_path('images/trabajador/').$name_image);

      }else{
        $name_image = $request->imagen;
      }

      $trabajador->fill($request->all());
      $trabajador->imagen = $name_image;

      if($trabajador->update()){
        return response()->json([],200);
      }else{
        return response()->json(['error' => "contacte con soporte"],500);
      }
    }

    public function destroy($id){

      $trabajador = Trabajador::find($id);
      if($trabajador->imagen){
        unlink(public_path('images/trabajador/'.$trabajador->imagen));
      }

      //unlink(public_path('images/trabajador/qrcode/'.$trabajador->qrcode));
      Trabajador::destroy($id);
      return response()->json([],200);
    }
}
