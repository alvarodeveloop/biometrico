<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreUsers;
use App\Models\Ente;
use App\User;
use JWTAuth;

class EnteController extends Controller
{
    //
    public function index(){
      $ente = $ente = Ente::get();
      return response()->json($ente,200);
    }

    public function store(StoreUsers $request){
      $ente = Ente::create($request->all());

      $user = new User;
      $user->fill($request->all());
      $user->id_perfil = 2;
      $user->id_ente = $ente->id;
      $user->password = bcrypt($request->email);
      $user->save();
      return response()->json([],200);
    }

    public function show($id){
      $ente = Ente::get($id);
      return response()->json($ente,200);
    }

    public function update(Request $request,$id){
      $ente = Ente::find($id);
      $ente->fill($request->all());
      $ente->update();
      $user = User::where('id_ente',$id)->where('id_departamento',null)->first();
      $user->fill($request->all());
      $user->update();

      return response()->json([],200);

    }

    public function destroy($id){
      Ente::destroy($id);
      User::where('id_ente',$id)->delete();
      return response()->json([],200);
    }
}
