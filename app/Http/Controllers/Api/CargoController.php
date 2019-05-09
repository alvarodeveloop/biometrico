<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Cargo;
use JWTAuth;

class CargoController extends Controller
{
    //
    public function index(){
      $user = JWTAuth::user();
      $cargo = Cargo::where('id_ente',$user->id_ente)->get();
      return response()->json($cargo,200);
    }

    public function store(Request $request){

      $userToken = JWTAuth::user();
      $cargo = new Cargo;
      $cargo->cargo = $request->cargo;
      $cargo->id_ente = $userToken->id_ente;
      $cargo->save();
      return response()->json([],200);
    }

    public function show($id){
      $user = JWTAuth::user();
      $cargo = Cargo::find($id);
      return response()->json($cargo,200);
    }

    public function update(Request $request,$id){
      $cargo = Cargo::find($id);
      $cargo->fill($request->all());
      $cargo->update();
      return response()->json([],200);

    }

    public function destroy($id){
      Cargo::destroy($id);
      return response()->json([],200);
    }
}
