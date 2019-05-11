<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\User;

class UserController extends Controller
{
    //
    public function show($id){
      $user = User::find($id);
      return response()->json($user,200);
    }

    public function update(Request $request, $id){
      $user = User::find($id);
      $pass = $user->password;
      $user->fill($request->all());
      if($request->password){
        $user->password = bcrypt($request->password);
      }else{
        $user->password = $pass;
      }
      $user->update();
      return response()->json([],200);
    }
}
