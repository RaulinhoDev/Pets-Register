import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListadoMascotasComponent } from './components/listado-mascotas/listado-mascotas.component';
import { AddEditMascotasComponent } from './components/add-edit-mascotas/add-edit-mascotas.component';
import { VerMascotaComponent } from './components/ver-mascota/ver-mascota.component';

const routes: Routes = [
  { path: '', redirectTo : '/listarMascotas', pathMatch: 'full'},
  { path: 'listarMascotas', component: ListadoMascotasComponent},
  { path: 'registrarMascotas', component: AddEditMascotasComponent},
  { path: 'editarMascotas/:id', component: AddEditMascotasComponent},
  { path: 'verMascotas/:id', component: VerMascotaComponent},
  { path: '**', redirectTo : '/listarMascotas', pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
