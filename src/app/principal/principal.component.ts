import { Component } from '@angular/core';
import { Cliente } from '../model/Cliente';
import { ClienteService } from '../servico/cliente.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent {

 //Objeto do tipo Cliente
 cliente = new Cliente();

 // Variável para visibilidade dos botões
 btnCadastro:boolean = true;

 //Varivel para visibilidade da tabela
 tabela:boolean = true;

 // json de clientes
 clientes:Cliente[] = [];

 //construtor
 constructor(private servico: ClienteService){

 }

 //Metodo de seleção
 selecionar():void{
   this.servico.selecionar()
   .subscribe(retorno =>this.clientes = retorno );
 }

 //Método de cadastro
 cadastrar():void{
  this.servico.cadastrar(this.cliente)
  .subscribe(retorno => {
    
    // Cadastrar o cliente no vetor
    this.clientes.push(retorno); });
    // Limpar  Formulario
    this.cliente = new Cliente();
    //Menssagem
    this.SuccessAlert('Cliente cadastrado com sucesso!');
   }

 //Metodo para selecionar um cliente especifico
 selecionarCliente(posicao:number):void{
  
  //Selecionar cliente no vetor
  this.cliente= this.clientes[posicao];

  //visibilidade dos botões
  this.btnCadastro = false;

  //visibilidade da tabela
  this.tabela = false;

 }

 //alterar clientes
 alterar():void{
  this.servico.alterar(this.cliente)
  .subscribe(retorno =>{

    //posicao do vetor do cliente
    let posicao = this.clientes.findIndex(obj => {
      return obj.codigo == retorno.codigo;
    });

    //alterar os dados do cliente no vetor
    this.clientes[posicao] = retorno;


    //visibilidade dos botoes
    this.btnCadastro = true;

    //visibilidade da tabela
    this.tabela =  true;

    //Mensagem
    this.WarningAlert('Cliente alterado com sucesso!');

    //limpar formulario
    this.cliente = new Cliente();

  })
 }
 
 //Metodo de inicialização
 ngOnInit(){
   this.selecionar();
 }

 //Metodo para remover clientes
 remover():void{
  this.servico.remover(this.cliente.codigo)
  .subscribe(retorno =>{

    //posicao do vetor do cliente
    let posicao = this.clientes.findIndex(obj => {
      return obj.codigo == this.cliente.codigo;
    });

    //remover  cliente no vetor
    this.clientes.splice(posicao, 1);

    //visibilidade dos botoes
    this.btnCadastro = true;

    //visibilidade da tabela
    this.tabela =  true;

    //Mensagem
    this.DangerAlert('Cliente removido com sucesso!');


    //limpar formulário
    this.cliente = new Cliente;

  })
 }

 //Cancelar e limpar formulário
 cancelar():void{

  this.cliente = new Cliente;
  
  this.tabela = true;
 }

 private SuccessAlert(message: string): void {
  const alertElement = document.createElement('div');
  alertElement.className = 'alert alert-success mt-3 fixed-top w-100';
  alertElement.textContent = message;

  document.body.appendChild(alertElement);

  setTimeout(() => {
    alertElement.remove();
  }, 3000);
}

private DangerAlert(message: string): void {
  const alertElement = document.createElement('div');
  alertElement.className = 'alert alert-danger mt-3 fixed-top w-100';
  alertElement.textContent = message;

  document.body.appendChild(alertElement);

  setTimeout(() =>  {
    alertElement.remove();
  }, 3000);
}

private WarningAlert(message: string): void {
  const alertElement = document.createElement('div');
  alertElement.className = 'alert alert-warning mt-3 fixed-top w-100';
  alertElement.textContent = message;

  document.body.appendChild(alertElement);

  setTimeout(() =>  {
    alertElement.remove();
  }, 3000);
}


}
