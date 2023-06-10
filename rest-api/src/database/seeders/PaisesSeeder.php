<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class PaisesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $paises = ['Argentina', 'Estados Unidos', 'México'];
        $date = Carbon::now();
        foreach ($paises as $pais) {
            DB::table('paises')->insert([
                'nombre' => $pais,
                'created_at' => $date,
                'updated_at' => $date
            ]);
        }
    }
}
