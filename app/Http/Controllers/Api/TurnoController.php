<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Turno;
use JWTAuth;

class TurnoController extends Controller
{
    //
    public function index(){
      $user = JWTAuth::user();
      $turno = Turno::where('id_ente',$user->id_ente)->get();
      return response()->json($turno,200);
    }

    public function store(Request $request){

      $userToken = JWTAuth::user();
      $turno = new Turno;
      $turno->fill($request->all());
      $turno->id_ente = $userToken->id_ente;

      $turno->save();
      return response()->json([],200);
    }

    public function show($id){
      $user = JWTAuth::user();
      $turno = Turno::find($id);
      return response()->json($turno,200);
    }

    public function update(Request $request,$id){
      $turno = Turno::find($id);
      $turno->fill($request->all());
      $turno->update();
      return response()->json([],200);

    }

    public function destroy($id){
      Turno::destroy($id);
      return response()->json([],200);
    }
}
