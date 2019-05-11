<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::group([
    'prefix' => 'auth',
], function () {
    Route::post('login', 'AuthController@login');
    Route::post('logout', 'AuthController@logout');
    Route::post('refresh', 'AuthController@refresh');
    Route::post('me', 'AuthController@me');
});

Route::namespace('Api')->group(function(){

  Route::get('/user/{id}','UserController@show');
  Route::put('/user/{id}','UserController@update');

  Route::get('/ente','EnteController@index');
  Route::get('/ente/{id}','EnteController@show');
  Route::post('/ente','EnteController@store');
  Route::put('/ente/{id}','EnteController@update');
  Route::delete('/ente/{id}','EnteController@destroy');

  Route::get('/departamento','DepartamentoController@index');
  Route::get('/departamento/{id}','DepartamentoController@show');
  Route::post('/departamento','DepartamentoController@store');
  Route::put('/departamento/{id}','DepartamentoController@update');
  Route::delete('/departamento/{id}','DepartamentoController@destroy');

  Route::get('/cargo','CargoController@index');
  Route::get('/cargo/{id}','CargoController@show');
  Route::post('/cargo','CargoController@store');
  Route::put('/cargo/{id}','CargoController@update');
  Route::delete('/cargo/{id}','CargoController@destroy');

  Route::get('/turno','TurnoController@index');
  Route::get('/turno/{id}','TurnoController@show');
  Route::post('/turno','TurnoController@store');
  Route::put('/turno/{id}','TurnoController@update');
  Route::delete('/turno/{id}','TurnoController@destroy');

  Route::get('/trabajador','TrabajadorController@index');
  Route::get('/trabajador/{id}','TrabajadorController@show');
  Route::post('/trabajador','TrabajadorController@store');
  Route::put('/trabajador/{id}','TrabajadorController@update');
  Route::delete('/trabajador/{id}','TrabajadorController@destroy');

  Route::get('/asistencia','AsistenciaController@index');
  Route::get('/asistencia/{id}','AsistenciaController@show');
  Route::post('/asistencia','AsistenciaController@store');
  Route::get('/asistencia_chart','AsistenciaController@chart_statistic');
  Route::get('/asistencia_by_day','AsistenciaController@asistencia_by_day');
  Route::post('/asistencia_filter','AsistenciaController@asistencia_filter');
  Route::get('/asistencia_by_cedula/{cedula}','AsistenciaController@asistencia_by_cedula');
  Route::get('/asistencia_by_ente/{ente}','AsistenciaController@asistencia_by_ente');


  Route::get('/config','ConfigController@index');
  Route::get('/config/{id}','ConfigController@show');
  Route::post('/config','ConfigController@store');
  Route::put('/config/{id}','ConfigController@update');
  Route::delete('/config/{id}','ConfigController@destroy');

  Route::post('/reporte/general','ReporteController@reporteGeneral');

});
