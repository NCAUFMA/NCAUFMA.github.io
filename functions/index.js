const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.deleteUser = functions.https.onRequest(async (req, res) => {
  const userId = req.body.email;

  try {
    // Exclui o documento do Firestore
    await admin.firestore().collection("users").doc(userId).delete();
    console.log(`Documento Firestore do usuário ${userId} excluído.`);

    // Exclui o usuário do Firebase Authentication
    const userRecord = await admin.auth().getUserByEmail(userId);
    await admin.auth().deleteUser(userRecord.uid);
    console.log(`Usuário ${userId} excluído do Firebase Authentication.`);

    res.status(200).send({ message: "Usuário excluído com sucesso!" });
  } catch (error) {
    console.error("Erro ao excluir usuário:", error);
    res.status(500).send({ message: "Erro ao excluir usuário." });
  }
});
