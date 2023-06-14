<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class EstadosSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $estados = [
            ['pais_id' => 1, 'nombre' => 'Buenos Aires'],
            ['pais_id' => 2, 'nombre' => 'California'],
            ['pais_id' => 3, 'nombre' => 'Aguascalientes'],
            ['pais_id' => 3, 'nombre' => 'Campeche'],
            ['pais_id' => 3, 'nombre' => 'CDMX']
        ];
        $date = Carbon::now();
        foreach ($estados as $estado) {
            DB::table('estados')->insert([
                'pais_id' => $estado['pais_id'],
                'nombre' => $estado['nombre'],
                'created_at' => $date,
                'updated_at' => $date
            ]);
        }
    }
}
