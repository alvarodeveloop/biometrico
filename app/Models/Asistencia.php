<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Asistencia extends Model
{
    //
    protected $table = "asistencia";
    protected $fillable = ['id_trabajador','imagen','tipo_registro','tipo_llegada'];
    public $timestamps = true;

    public static function determinatedTypeRegister($id){
      $today = date('Y-m-d');
      $where = "CAST(created_at AS DATE) = '$today' and id_trabajador = $id";
        return self::select('*')
              ->whereRaw($where)
              ->get();
    }

    public static function get($id_ente = null,$id_departamento = null,$id_trabajador = null,$desde = null,$hasta = null,$hoy = null,$status = null,$llegada = null){

      $where = self::makeWhere($id_ente,$id_departamento,$id_trabajador,$desde,$hasta,$hoy,$status,$llegada);

      $sql = "SELECT a.*,
              CONCAT(t.nombre,' ',t.apellido) as nombre_trabajador,
              CASE a.tipo_registro
              WHEN 1 THEN 'Entrada'
              ELSE 'Salida'
              END as tipo,

              CASE a.tipo_llegada
              WHEN 0 THEN 'Temprano'
              WHEN 1 THEN 'Normal'
              ELSE 'Tarde'
              END as llegada,
              c.cargo,
              tu.turno,
              d.departamento,
              to_char(a.created_at, 'DD-MM-YYYY HH12:MI:SS AM') as fecha,
              t.imagen as imagen_trabajador

              from asistencia as a
              INNER JOIN trabajador as t ON t.id = a.id_trabajador
              INNER JOIN departamento as d ON t.id_departamento = d.id
              INNER JOIN cargo as c ON c.id = t.id_cargo
              INNER JOIN turno as tu ON tu.id = t.id_turno
              $where
              ";
      return DB::select(DB::raw($sql));
    }

    public static function stadistic_llegada($id_ente = null,$id_departamento = null,$id_trabajador = null,$type = false){
      $where = "WHERE '1'";
      if($id_ente){
        $where = "WHERE d.id_ente = $id_ente";
      }

      if($id_departamento){
        if(!empty($where)){
          $where.= " and t.id_departamento = $id_departamento";
        }else{
          $where.= " WHERE t.id_departamento = $id_departamento";
        }
      }

      if($id_trabajador){
        if(!empty($where)){
          $where.= " and t.id = $id_trabajador";
        }else{
          $where.= " WHERE t.id = $id_trabajador";
        }
      }

      $extra = "";
      if(!$type){
        $extra = "AND a.tipo_registro = 1 and a.tipo_llegada = 2";
      }else{
        $extra = "AND a.tipo_registro = 1 and a.tipo_llegada < 2";
      }

      $sql = "SELECT * from(
                SELECT
                t.id,
                CONCAT(t.nombre,' ',t.apellido) as name,
                CAST(COUNT(a.tipo_llegada) as INTEGER) as value

                from asistencia as a
                INNER JOIN trabajador as t ON t.id = a.id_trabajador
                INNER JOIN departamento as d ON t.id_departamento = d.id
                INNER JOIN cargo as c ON c.id = t.id_cargo
                INNER JOIN turno as tu ON tu.id = t.id_turno
                $where $extra
                GROUP BY t.id,name
              ) as t1 ORDER BY value desc LIMIT 5";

      return DB::select(DB::raw($sql));
    }

    private static function makeWhere(
      $id_ente = null,
      $id_departamento = null,
      $id_trabajador = null ,
      $desde = null ,
      $hasta = null,
      $hoy = null,
      $status = null,
      $llegada = null){

      $where = "";

      if($id_ente){
        $where = "WHERE d.id_ente = $id_ente";
      }

      if($id_departamento){
        if(!empty($where)){
          $where.= " and t.id_departamento = $id_departamento";
        }else{
          $where.= " WHERE t.id_departamento = $id_departamento";
        }
      }

      if($id_trabajador){
        if(!empty($where)){
          $where.= " and t.id = $id_trabajador";
        }else{
          $where.= " WHERE t.id = $id_trabajador";
        }
      }

      if($desde){
        if(!empty($where)){
          $where.= " and CAST(a.created_at AS DATE) >= '$desde'";
        }else{
          $where.= " WHERE CAST(a.created_at AS DATE) >= '$desde'";
        }
      }

      if($hasta){
        if(!empty($where)){
          $where.= " and CAST(a.created_at AS DATE) <= '$hasta'";
        }else{
          $where.= " WHERE CAST(a.created_at AS DATE) <= '$hasta'";
        }
      }

      if($hoy){
        if(!empty($where)){
          $where.= " and CAST(a.created_at as DATE) = '$hoy'";
        }else{
          $where.= " WHERE CAST(a.created_at as DATE) = '$hoy'";
        }
      }

      if($status !== null && $status !== ""){
        if(!empty($where)){
          $where.= " and a.tipo_llegada = $status";
        }else{
          $where.= " WHERE a.tipo_llegada = $status";
        }
      }

      if($llegada){
        if(!empty($where)){
          $where.= " and a.tipo_registro = $llegada";
        }else{
          $where.= " WHERE a.tipo_registro = $llegada";
        }
      }

      return $where;
    }
}
