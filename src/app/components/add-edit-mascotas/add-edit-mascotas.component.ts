import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Mascota } from 'src/app/interfaces/mascota';
import { MascotaService } from 'src/app/services/mascota.service';

@Component({
  selector: 'app-add-edit-mascotas',
  templateUrl: './add-edit-mascotas.component.html',
  styleUrls: ['./add-edit-mascotas.component.css']
})
export class AddEditMascotasComponent implements OnInit {
  loading: boolean = false;
  form: FormGroup;
  id: number;
  operacion: string = 'Agregar'

  

  constructor(private fb: FormBuilder, private _mascotaService: MascotaService,
    private _snackBar: MatSnackBar, private router: Router,
    private aRoute: ActivatedRoute) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      raza: ['', Validators.required],
      edad: ['', Validators.required],
      peso: ['', Validators.required],
      color: ['', Validators.required]

    })
    this.id = Number(this.aRoute.snapshot.paramMap.get('id'));
    

  }

  ngOnInit(): void {

    if (this.id != 0) {
      this.operacion = 'Editar';
      this.obtenerMascota(this.id);
    }
  }

  obtenerMascota(id: number) {
    this.loading = true;
    this._mascotaService.getMascota(id).subscribe(data => {
      this.form.patchValue({
        nombre: data.nombre,
        raza: data.raza,
        edad: data.edad,
        peso: data.peso,
        color: data.color
      })
      this.loading = false;
    })
  }

  agregarEditarMascota() {

    /* const nombre = this.form.get('nombre')?.value; */

    // Armamos el objeto
    const mascota: Mascota = {
      nombre: this.form.value.nombre,
      raza: this.form.value.raza,
      edad: this.form.value.edad,
      peso: this.form.value.peso,
      color: this.form.value.color
    }
    

    if(this.id != 0) {
      mascota.id = this.id;
      this.editarMascota(this.id, mascota);
    } else {
      this.agregarMascota(mascota);
    }
  }

  editarMascota(id: number, mascota: Mascota) {
    this.loading = true;
    this._mascotaService.updateMascota(id, mascota).subscribe(() => {
      this.loading = false;
      this.mensajeExito('actualizada');
      this.router.navigate(['/listarMascotas'])
    })
  }

  agregarMascota(mascota: Mascota) {
    this._mascotaService.addMascota(mascota).subscribe(data => {
      this.mensajeExito('registrada');
      this.router.navigate(['/listarMascotas'])
    })
  }

  mensajeExito(texto: string) {
    this._snackBar.open(`La Mascota fue ${texto} con exito`, '', {
      duration: 4000,
      horizontalPosition: 'right',
    });
  }
}
