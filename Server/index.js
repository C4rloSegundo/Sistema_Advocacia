const express = require("express");
const multer = require("multer");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "banco_sistema",
});

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// Rotas para clientes
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../Client/src/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage });
app.post("/registerClientes", upload.single("arquivo"), (req, res) => {
  const { nome, cpf, nacionalidade, estadoCivil, profissao, endereco, dataNascimento, telefone, celular, email, id_advogado, nome_advogado } = req.body;
  const arquivo = req.file;

  const SQL = "INSERT INTO clientes (nome, cpf, nacionalidade, estadoCivil, profissao, endereco, dataNascimento, telefone, celular, email, id_advogado, nome_advogado, arquivo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

  db.query(SQL, [nome, cpf, nacionalidade, estadoCivil, profissao, endereco, dataNascimento, telefone, celular, email, id_advogado, nome_advogado, arquivo.filename], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Erro ao cadastrar cliente");
    } else {
      res.status(200).send("Cliente cadastrado com sucesso");
    }
  });
});

app.get('/getClientes', (req, res) => {
  const SQL = "SELECT * FROM clientes";

  db.query(SQL, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Erro ao obter clientes");
    } else {
      res.status(200).send(result);
    }
  });
});

app.get('/getClientesAdv', (req, res) => {
  const idAdvogado = req.query.idAdvogado;

  const SQL = "SELECT * FROM clientes WHERE id_advogado = ?";

  db.query(SQL, [idAdvogado], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Erro ao obter clientes");
    } else {
      res.status(200).send(result);
    }
  });
});

app.post("/searchClientes", (req, res) => {
  const { nome, cpf, nacionalidade, estadoCivil, profissao, endereco, dataNascimento, telefone, celular, email } = req.body;

  const SQL =
    "SELECT * FROM clientes WHERE nome=? AND cpf=? AND nacionalidade=? AND estadoCivil=? AND profissao=? AND endereco=? AND dataNascimento=? AND telefone=? AND celular=? AND email=?";

  db.query(SQL, [nome, cpf, nacionalidade, estadoCivil, profissao, endereco, dataNascimento, telefone, celular, email], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Erro ao pesquisar cliente");
    } else {
      res.status(200).send(result);
    }
  });
});

app.put("/editClientes", (req, res) => {
  const { id, nome, cpf, nacionalidade, estadoCivil, profissao, endereco, dataNascimento, telefone, celular, email } = req.body;

  const SQL = "UPDATE clientes SET nome = ?, cpf = ?, nacionalidade = ?, estadoCivil = ?, profissao = ?, endereco = ?, dataNascimento = ?, telefone = ?, celular = ?, email = ? WHERE id = ?";

  db.query(SQL, [nome, cpf, nacionalidade, estadoCivil, profissao, endereco, dataNascimento, telefone, celular, email, id], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Erro ao atualizar cliente");
    } else {
      res.status(200).send("Cliente atualizado com sucesso");
    }
  });
});

app.delete("/deleteClientes/:id", (req, res) => {
  const { id } = req.params;

  const SQL = "DELETE FROM clientes WHERE id = ?";

  db.query(SQL, [id], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Erro ao excluir cliente");
    } else {
      res.status(200).send("Cliente excluído com sucesso");
    }
  });
});

const storage1 = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../Client/src/procuracoes");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});
const upload1 = multer({ storage1 });
app.post("/uploadProcuracao/:clienteId", upload1.single("file"), (req, res) => {
  const clienteId = req.params.clienteId;
  const procuracao = req.file.buffer;
  const SQL = "UPDATE clientes SET procuracoes = ? WHERE id = ?";
  db.query(SQL, [procuracao, clienteId], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Erro ao salvar a procuração");
    } else {
      res.status(200).send("Procuração salva com sucesso");
    }
  });
});

// Rotas para advogados
app.post("/registerAdvogados", (req, res) => {
  const { nome, perfil, numOAB, email, senha, telefone } = req.body;

  const SQL = "INSERT INTO advogados (nome, perfil, numOAB, email, senha, telefone) VALUES (?, ?, ?, ?, ?, ?)";

  db.query(SQL, [nome, perfil, numOAB, email, senha, telefone], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Erro ao cadastrar advogado");
    } else {
      res.status(200).send("Advogado cadastrado com sucesso");
    }
  });
});

app.get('/getAdvogados', (req, res) => {
  const SQL = "SELECT * FROM advogados";

  db.query(SQL, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Erro ao obter advogados");
    } else {
      res.status(200).send(result);
    }
  });
});

app.post("/searchAdvogados", (req, res) => {
  const { nome } = req.body;
  const { perfil } = req.body;
  const { numOAB } = req.body;
  const { email } = req.body;
  const { senha } = req.body;
  const { telefone } = req.body;

  let SQl =
    "SELECT * from advogados WHERE nome=? AND perfil=? AND numOAB=? AND email=? AND senha=? AND telefone=?";
  db.query(SQl, [nome, perfil, numOAB, email, senha, telefone], (err, result) => {
    if (err) res.send(err);
    res.send(result);
  });
});

app.put("/editAdvogados", (req, res) => {
  const { id, nome, perfil, numOAB, email, senha, telefone } = req.body;

  const SQL = "UPDATE advogados SET nome = ?, perfil = ?, numOAB = ?, email = ?, senha = ?, telefone = ? WHERE id = ?";

  db.query(SQL, [nome, perfil, numOAB, email, senha, telefone, id], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Erro ao atualizar advogado");
    } else {
      res.status(200).send("Advogado atualizado com sucesso");
    }
  });
});

app.delete("/deleteAdvogados/:id", (req, res) => {
  const { id } = req.params;

  const SQL = "DELETE FROM advogados WHERE id = ?";

  db.query(SQL, [id], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Erro ao excluir advogado");
    } else {
      res.status(200).send("Advogado excluído com sucesso");
    }
  });
});

// Rotas para recepcionistas
app.post("/registerRecepcionistas", (req, res) => {
  const { nome, perfil, email, senha, telefone } = req.body;

  const SQL = "INSERT INTO recepcionista (nome, perfil, email, senha, telefone) VALUES (?, ?, ?, ?, ?)";

  db.query(SQL, [nome, perfil, email, senha, telefone], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Erro ao cadastrar recepcionista");
    } else {
      res.status(200).send("Recepcionista cadastrado com sucesso");
    }
  });
});

app.post("/registerRecepcionistasAdv", (req, res) => {
  const { nome, perfil, email, senha, telefone, id_advogado, nome_advogado } = req.body;

  const SQL =
    "INSERT INTO recepcionista (nome, perfil, email, senha, telefone, id_advogado, nome_advogado) VALUES (?, ?, ?, ?, ?, ?, ?)";

  db.query(
    SQL,
    [nome, perfil, email, senha, telefone, id_advogado, nome_advogado],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Erro ao cadastrar recepcionista");
      } else {
        res.status(200).send("Recepcionista cadastrado com sucesso");
      }
    }
  );
});

app.put("/editRecepcionistas", (req, res) => {
  const { id, nome, perfil, email, senha, telefone } = req.body;

  const SQL = "UPDATE recepcionista SET nome = ?, perfil = ?, email = ?, senha = ?, telefone = ? WHERE id = ?";

  db.query(SQL, [nome, perfil, email, senha, telefone, id], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Erro ao atualizar recepcionista");
    } else {
      res.status(200).send("Recepcionista atualizado com sucesso");
    }
  });
});

app.post("/searchRecepcionistas", (req, res) => {
  const { nome, perfil, email, senha, telefone } = req.body;

  const SQL =
    "SELECT * FROM recepcionista WHERE nome=? AND perfil=? AND email=? AND senha=? AND telefone=?";

  db.query(SQL, [nome, perfil, email, senha, telefone], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Erro ao pesquisar recepcionista");
    } else {
      res.status(200).send(result);
    }
  });
});

app.delete("/deleteRecepcionistas/:id", (req, res) => {
  const { id } = req.params;

  const SQL = "DELETE FROM recepcionista WHERE id = ?";

  db.query(SQL, [id], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Erro ao excluir recepcionista");
    } else {
      res.status(200).send("Recepcionista excluído com sucesso");
    }
  });
});

app.get("/getRecepcionistas", (req, res) => {
  const SQL =
    "SELECT id, nome, perfil, email, senha, id_advogado, nome_advogado FROM recepcionista WHERE id_advogado = ?";

    const userId = req.query.idAdvogado;

  db.query(SQL, [userId], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Erro ao obter funcionários");
    } else {
      res.status(200).send(result);
    }
  });
});

app.get('/getFuncionarios', (req, res) => {
  const SQL = "SELECT id, nome, perfil, numOAB, email, senha, telefone FROM advogados UNION SELECT id, nome, perfil, NULL, email, senha, telefone FROM recepcionista";

  db.query(SQL, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Erro ao obter funcionários");
    } else {
      res.status(200).send(result);
    }
  });
});

app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  db.query("SELECT * FROM advogados WHERE email = ?", [email], (err, advogadoResult) => {
    if (err) {
      res.send(err);
    }
    if (advogadoResult.length > 0) {
      if (password === advogadoResult[0].senha) {
        res.send({ perfil: advogadoResult[0].perfil, id: advogadoResult[0].id, nome: advogadoResult[0].nome });
      } else {
        res.send({ msg: "Email ou senha incorretos" });
      }
    } else {
      db.query("SELECT * FROM recepcionista WHERE email = ?", [email], (err, recepcionistaResult) => {
        if (err) {
          res.send(err);
        }
        if (recepcionistaResult.length > 0) {
          if (password === recepcionistaResult[0].senha) {
            res.send({ perfil: recepcionistaResult[0].perfil, id: recepcionistaResult[0].id, nome: recepcionistaResult[0].nome });
          } else {
            res.send({ msg: "Email ou senha incorretos" });
          }
        } else {
          res.send({ msg: "Usuário não registrado!" });
        }
      });
    }
  });
});

// Rotas para processo
app.post("/registerProcesso", (req, res) => {
  const { dataProcesso, horaProcesso, numProcesso, vara, id_cliente, nome_cliente } = req.body;

  const SQL = "INSERT INTO processo (dataProcesso, horaProcesso, numProcesso, vara, id_cliente, nome_cliente ) VALUES (?, ?, ?, ?, ?, ?)";

  db.query(SQL, [dataProcesso, horaProcesso, numProcesso, vara, id_cliente, nome_cliente], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Erro ao cadastrar cliente");
    } else {
      res.status(200).send("Cliente cadastrado com sucesso");
    }
  });
});

app.get('/getProcesso', (req, res) => {
  const SQL = "SELECT * FROM processo";

  db.query(SQL, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Erro ao obter os processos");
    } else {
      res.status(200).send(result);
    }
  });
});

app.post("/searchProcesso", (req, res) => {
  const { dataProcesso, horaProcesso, numProcesso, vara, id_cliente, nome_cliente } = req.body;

  const SQL =
    "SELECT * FROM processo WHERE dataProcesso=? AND horaProcesso=? AND numProcesso=? AND vara=? AND id_cliente=? AND nome_cliente=?";

  db.query(SQL, [dataProcesso, horaProcesso, numProcesso, vara, id_cliente, nome_cliente], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Erro ao pesquisar cliente");
    } else {
      res.status(200).send(result);
    }
  });
});

app.put("/editProcesso/:id", (req, res) => {
  const { dataProcesso, horaProcesso, numProcesso, vara, id_cliente, nome_cliente } = req.body;
  const processoId = req.params.id;

  const SQL = "UPDATE processo SET dataProcesso = ?, horaProcesso = ?, numProcesso = ?, vara = ?, id_cliente = ?, nome_cliente = ? WHERE id = ?";

  db.query(SQL, [dataProcesso, horaProcesso, numProcesso, vara, id_cliente, nome_cliente, processoId], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Erro ao atualizar cliente");
    } else {
      res.status(200).send("Cliente atualizado com sucesso");
    }
  });
});

app.delete("/deleteProcesso/:id", (req, res) => {
  const { id } = req.params;

  const SQL = "DELETE FROM processo WHERE id = ?";

  db.query(SQL, [id], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Erro ao excluir o processo");
    } else {
      res.status(200).send("Processo excluído com sucesso");
    }
  });
});

//rotas para tarefa
app.get('/getTarefa', (req, res) => {
  db.query('SELECT * FROM tarefa', (error, results) => {
    if (error) {
      console.error('Erro ao obter os eventos:', error);
      res.status(500).json({ error: 'Erro ao obter os eventos' });
    } else {
      const events = results.map((event) => ({
        id: event.id,
        title: event.title,
        start: event.start,
        end: event.end,
        allDay: event.allDay,
        descricao: event.descricao,
      }));
      res.json(events);
    }
  });
});

app.get('/getTarefaAdv', (req, res) => {
  const idAdvogado = req.query.idAdvogado;

  const SQL = "SELECT * FROM tarefa WHERE id_advogado = ?";

  db.query(SQL, [idAdvogado], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Erro ao obter clientes");
    } else {
      res.status(200).send(result);
    }
  });
});

app.delete('/deleteTarefa/:eventId', (req, res) => {
  const eventId = req.params.eventId;

  db.query('DELETE FROM tarefa WHERE id = ?', eventId, (error) => {
    if (error) {
      console.error('Erro ao excluir o evento:', error);
      res.status(500).json({ error: 'Erro ao excluir o evento' });
    } else {
      res.status(200).json({ message: 'Evento excluído com sucesso' });
    }
  });
});

app.put("/editTarefa/:id", (req, res) => {
  const event = req.body;
  const eventId = req.params.id;

  const SQL = "UPDATE tarefa SET title = ?, start = ?, end = ?, allDay = ?, descricao = ? WHERE id = ?";

  db.query(SQL, [event.title, event.start, event.end, event.allDay , event.descricao , eventId ], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Erro ao atualizar cliente");
    } else {
      res.status(200).send("Cliente atualizado com sucesso");
    }
  });
});

app.post('/registerTarefa', (req, res) => {
  const event = req.body;

  const sql = `INSERT INTO tarefa (title, start, end, allDay, descricao, id_advogado,  nome_advogado, id_recep, nome_recep) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  const values = [event.title, event.start, event.end, event.allDay,  event.descricao, event.idAdvogado, event.nomeAdvogado, event.idRecep, event.nomeRecep];

  db.query(sql, values, (error, result) => {
    if (error) {
      console.error('Erro ao criar o evento:', error);
      res.status(500).json({ error: 'Erro ao criar o evento' });
    } else {
      const createdEvent = { id: result.insertId, ...event };
      res.status(200).json(createdEvent);
    }
  });
});

app.listen(3001, () => {
  console.log("Servidor rodando");
});
