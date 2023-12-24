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
    alert('Cliente cadastrado com sucesso!');
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
    alert('Cliente alterado com sucesso!');

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
    alert('Cliente removido com sucesso!');

    //limpar formulário
    this.cliente = new Cliente;

  })
 }
}
