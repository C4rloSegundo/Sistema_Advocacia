import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

function gerarPdf(listClientes){


    const getCurrentDate = () => {
        const currentDate = new Date();
        const day = String(currentDate.getDate()).padStart(2, "0");
        const month = String(currentDate.getMonth() + 1).padStart(2, "0");
        const year = String(currentDate.getFullYear());
    
        return `${day}/${month}/${year}`;
      };
    


    const detalhes = [{
        text: 'Procuração - Pessoa Física',
        style: 'header',
        alignment: 'center', 
        bold: true,
        margin: [0,100,0,100], //left, top, right, bottom
        
    },
    {
        text: [
            
            'Ourtogante: ' + listClientes.nome + ' , ' + listClientes.nacionalidade + ', ' + listClientes.estadoCivil + ', ' + listClientes.profissao + ', portados(a) do CPF nº ' + listClientes.cpf + ', expedido pelo Secretaria Senai, residente e domiciliado(a) a ' + listClientes.endereco + ' telefone ' + listClientes.telefone + ', pelo presente instrumento nomeia e constitui como seu (sua) bastante Procurador(a)  ' + listClientes.nome_advogado + ' ,  expedido pelo Secretaria Senai, residente e domiciliado(a) a Av. Eduardo Fróes da Mota, bairro Campo Limpo, município Feira de Santana, Estado Bahia, CEP 44032-002, telefone (75)0800-99547, com poderes para representar o outorgante perante a Receita Federal do Brasil, para requerer/solicitar (ad judicia et extra judicia) deste instrumento, cessando os efeitos deste a partir de ' +  getCurrentDate() + '.'
            ],
        alignment: 'center',
        bold: false,
        margin: [0,0,0,100]
        
    }, 
    {
        text: [
            
            '__________________________,______de___________________de______\n ',
            '         (Local)                             (Data)              '
            ],
        alignment: 'center',
        bold: false,
        margin: [0,40,0,100]
    }, 
    {
        text: [
            
            '____________________________________________________________________________________________ \n ',
            '                       (Assinatura do Outorgante)                                       '
            ],
        alignment: 'center',
        bold: false
    }, 
    

];

    function Rodape(currentPage, pageCount){
        return [{
            text: currentPage + '/' + pageCount,
            alignment: 'right',
            fontSize: 9,
            margin: [0,10,20,0] //left, top, right, bottom 
        }]
    }

    const docDefinicoes = {
        pageSize: 'A4',
        pageMargins: [15, 50, 15, 40],

        content: [detalhes],
        footer: Rodape
    }

    pdfMake.createPdf(docDefinicoes).open();

}

export default gerarPdf;