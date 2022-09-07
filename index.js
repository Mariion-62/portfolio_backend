const express = require('express');
const cors = require('cors');
const { backPort, db } = require('./config');

const app = express();

app.use(cors());
app.use(express.json());

// Routes realisations

app.get('/realisations', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM realisations');
    res.status(200).json(rows);
  } catch (err) {
    res.status(404).send('Ho nion ¯(°_o)/¯ ');
  }
});

app.get('/realisations/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [realisation] = await db.query(
      `SELECT id, title, picture, content, linkGithub, linkSite, problematique, group, time
    FROM realisations
    WHERE id =? `,
      [id]
    );
    if (realisation.length) res.json(realisation);
    else throw new Error('Pas de réalisations trouvées');
  } catch (err) {
    console.warn(err);
    res.status(404).send('ERROR');
  }
});

app.post('/realisations', async (req, res) => {
  const {
    title,
    picture,
    content,
    linkGithub,
    linkSite,
    problematique,
    group,
    time,
  } = await req.body;
  await db.query(
    `INSERT INTO realisations (title, picture, content, linkGithub, linkSite, problematique, group, time)
    VALUES (?,?,?,?,?,?,?,?)`,
    [title, picture, content, linkGithub, linkSite, problematique, group, time]
  );
  res.status(204).send('Tu as ajouté une nouvelle réalisation !');
});

app.put('/realisations/:id', async (req, res) => {
  const {
    title,
    picture,
    content,
    linkGithub,
    linkSite,
    problematique,
    group,
    time,
  } = req.body;
  const { id } = req.params;
  await db.query(
    `UPDATE realisations
    SET title=?, picture=?, content=?, linkGithub=?, linkSite=?, problematique=?, group=?, time=?
    WHERE id=?
    `,
    [
      title,
      picture,
      content,
      linkGithub,
      linkSite,
      problematique,
      group,
      time,
      id,
    ]
  );
  res.status(204).send('Tu as mis à jour cette réalisations');
});

app.delete('/realisations/:id', async (req, res) => {
  const { id } = req.params;
  await db.query(
    ` DELETE FROM realisations
    WHERE id=?
    `,
    [id]
  );
  res.status(204).send('Tu as supprimé une réalisation');
});

// Routes parcours

app.get('/parcours', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM parcours');
    res.status(200).json(rows);
  } catch (err) {
    res.status(404).send('Ho nion ¯(°_o)/¯ ');
  }
});

app.get('/parcours/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [parcour] = await db.query(
      `SELECT id, date, experience, picture
    FROM parcours
    WHERE id =? `,
      [id]
    );
    if (parcour.length) res.json(parcour);
    else throw new Error('Pas de parcours trouvés');
  } catch (err) {
    console.warn(err);
    res.status(404).send('ERROR');
  }
});

app.post('/parcours', async (req, res) => {
  const { date, experience, picture } = await req.body;
  await db.query(
    `INSERT INTO parcours (date, experience, picture)
    VALUES (?,?,?)`,
    [date, experience, picture]
  );
  res.status(204).send('Tu as ajouté un nouveau parcours !');
});

app.put('/parcours/:id', async (req, res) => {
  const { date, experience, picture } = req.body;
  const { id } = req.params;
  await db.query(
    `UPDATE parcours
    SET date=?, experience=?, picture=?
    WHERE id=?
    `,
    [date, experience, picture, id]
  );
  res.status(204).send('Tu as mis à jour ce parcours');
});

app.delete('/parcours/:id', async (req, res) => {
  const { id } = req.params;
  await db.query(
    ` DELETE FROM parcours
    WHERE id=?
    `,
    [id]
  );
  res.status(204).send('Tu as supprimé un parcours');
});

// Routes bénévoles

app.get('/benevole', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM benevole');
    res.status(200).json(rows);
  } catch (err) {
    res.status(404).send('Ho nion ¯(°_o)/¯ ');
  }
});

app.get('/benevole/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [benevole] = await db.query(
      `SELECT id, picture, listOne, listTwo, listThree, listFour, listFive 
    FROM benevole
    WHERE id =? `,
      [id]
    );
    if (benevole.length) res.json(benevole);
    else throw new Error('Pas d expériences bénévoles trouvées');
  } catch (err) {
    console.warn(err);
    res.status(404).send('ERROR');
  }
});

app.post('/benevole', async (req, res) => {
  const { picture, listOne, listTwo, listThree, listFour, listFive } =
    await req.body;
  await db.query(
    `INSERT INTO benevole (picture, listOne, listTwo, listThree, listFour, listFive)
    VALUES (?,?,?)`,
    [picture, listOne, listTwo, listThree, listFour, listFive]
  );
  res.status(204).send('Tu as ajouté un nouveau parcours !');
});

app.put('/benevole/:id', async (req, res) => {
  const { picture, listOne, listTwo, listThree, listFour, listFive } = req.body;
  const { id } = req.params;
  await db.query(
    `UPDATE benevole
    SET picture=?, listOne=?, listTwo=?, listThree=?, listFour=?, listFive=?
    WHERE id=?
    `,
    [picture, listOne, listTwo, listThree, listFour, listFive, id]
  );
  res.status(204).send('Tu as mis à jour cette expérience personnelle');
});

app.delete('/benevole/:id', async (req, res) => {
  const { id } = req.params;
  await db.query(
    ` DELETE FROM benevole
    WHERE id=?
    `,
    [id]
  );
  res.status(204).send('Tu as supprimé une expérience personnelle');
});

app.use('/', (req, res) => {
  res.status(404).send('Route not found !');
});

app.listen(backPort, () => {
  console.log(
    `Portfolios Marion now available on http://localhost:${backPort} !`
  );
});
