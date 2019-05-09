<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreUsers;
use App\Models\Departamento;
use App\User;
use JWTAuth;

class DepartamentoController extends Controller
{
    //
    public function index(){
      $user = JWTAuth::user();
      $depar = Departamento::get($user->id_ente,null);
      return response()->json($depar,200);
    }

    public function store(StoreUsers $request){

      $userToken = JWTAuth::user();
      $depar = new Departamento;
      $depar->departamento = $request->departamento;
      $depar->id_ente = $userToken->id_ente;
      $depar->save();

      $user = new User;
      $user->fill($request->all());
      $user->id_perfil = 3;
      $user->id_departamento = $depar->id;
      $user->id_ente = $userToken->id_ente;
      $user->password = bcrypt($request->email);
      $user->save();
      return response()->json([],200);
    }

    public function show($id){
      $user = JWTAuth::user();
      $ente = Departamento::get($user->id_ente,$id);
      return response()->json($ente,200);
    }

    public function update(Request $request,$id){
      $departamento = Departamento::find($id);
      $departamento->fill($request->all());
      $departamento->update();
      $user = User::where('id_departamento',$id)->first();
      $user->fill($request->all());
      $user->update();

      return response()->json([],200);

    }

    public function destroy($id){
      Departamento::destroy($id);
      User::where('id_departamento',$id)->delete();
      return response()->json([],200);
    }
}
