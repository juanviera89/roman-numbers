import { HttpClient, HttpParams, HttpRequest } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  public numeroNatural: number | null = null;
  public numeroRomano: string | null = null;
  public numeroNaturalValido: boolean = true;
  public numeroRomanoValido: boolean = true;
  public numeroRomanoDeNatural: string | null = null;
  public numeroNaturalDeRomano: number | null = null;
  public errorRomanoDeNatural: string | null = null;
  public errorNaturalDeRomano: string | null = null;

  constructor(private http: HttpClient) { }

  public validarNumeroNatural() {
    console.log(this.numeroNatural);

    this.numeroNaturalValido = true
    if (this.numeroNatural === null)
      return

    if (isNaN(this.numeroNatural)
      || this.numeroNatural > 3999)
      this.numeroNaturalValido = false

    console.log(this.numeroNaturalValido);
  }
  public validarNumeroRomano() {
    this.numeroRomanoValido = true
    if (this.numeroRomano === null) return
    if (typeof this.numeroRomano !== 'string'
      || `${this.numeroRomano}`.split('').some(char => !'IVXLCDM'.includes(char.toUpperCase())))
      this.numeroRomanoValido = false
  }
  private numeroNaturalARomano(numero: number): Observable<object> {
    const requestOptions = new HttpRequest('GET',`${window.location.protocol}//${window.location.host}/natural/romano/${numero}`,{}, {responseType:'text'})
    return this.http.request(requestOptions)
  }
  private numeroRomanoANatural(numero: string): Observable<object> {
    const requestOptions = new HttpRequest('GET',`${window.location.protocol}//${window.location.host}/romano/natural/${numero.toUpperCase()}`,{}, {responseType:'text'})
    return this.http.request(requestOptions)
  }
  public convertirNumeroNatural(event: Event) {
    event.preventDefault()
    this.numeroRomanoDeNatural = null
    this.errorRomanoDeNatural = null
    this.numeroNaturalARomano(this.numeroNatural || 0).subscribe(
      ( data : {body? : string}) => {
        //success
        console.log('success');
        console.log(data);
        this.numeroRomanoDeNatural = `${data.body}`
      },
      error => {
        //error
        console.log('error');
        console.log(error);
        if(error.message || error.body) this.errorRomanoDeNatural = `${error.message || error.body}`
        else this.errorRomanoDeNatural = `Ha ocurrido un error conectando con el servicio`
      },
      () => {
        //finally
      }
    )
  }
  public convertirNumeroRomano(event: Event) {
    this.numeroNaturalDeRomano = null
    this.errorNaturalDeRomano = null
    this.numeroRomanoANatural(this.numeroRomano || '').subscribe(
      (data : {body? : string} ) => {
        //success
        console.log('success');
        console.log(data);
        console.log(typeof data);
        this.numeroNaturalDeRomano = parseInt(data.body || '')
      },
      error => {
        //error
        console.log('error');
        console.log(error);
        if(error.message || error.body) this.errorNaturalDeRomano = `${error.message || error.body}`
        else this.errorNaturalDeRomano = `Ha ocurrido un error conectando con el servicio`
      },
      () => {
        //finally
      }
    )

  }
}
