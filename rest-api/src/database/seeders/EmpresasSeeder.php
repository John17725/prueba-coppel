<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class EmpresasSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $empresas = ['Afore Coppel', 'BanCoppel', 'Coppel'];
        $date = Carbon::now();
        foreach ($empresas as $empresa) {
            DB::table('empresa')->insert([
                'nombre' => $empresa,
                'created_at' => $date,
                'updated_at' => $date
            ]);
        }
    }
}
