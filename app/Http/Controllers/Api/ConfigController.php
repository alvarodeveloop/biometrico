<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Config;
use JWTAuth;

class ConfigController extends Controller
{
    //

    public function index(){
      $user = JWTAuth::user();
      $config = Config::get($user->id_ente);
      return response()->json($config,200);
    }

    public function store(Request $request){

      $userToken = JWTAuth::user();
      if(count(Config::get($userToken->id_ente)) > 0){
        return response()->json([
          'errors' => ['Registro' => ['Solo puede tener una configuración']]
        ],500);
      }else{
        $config = new Config;
        $config->fill($request->all());
        $config->id_ente = $userToken->id_ente;
        $config->save();
        return response()->json([],200);
      }

    }

    public function show($id){
      $user = JWTAuth::user();
      $config = Config::find($id);
      return response()->json($config,200);
    }

    public function update(Request $request,$id){
      $config = Config::find($id);
      $config->fill($request->all());
      $config->update();
      return response()->json([],200);

    }

    public function destroy($id){
      Config::destroy($id);
      return response()->json([],200);
    }
}
