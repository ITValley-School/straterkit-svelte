<script>
    import SpkButton from "$lib/@spk/uielements/Button/SpkButton.svelte";
    import SpkBasicCard from "$lib/@spk/SpkBasicCard.svelte";
    import { Col, Row, Form, FormGroup, Label, Input } from "@sveltestrap/sveltestrap";
  
    let user = {
      name: "Json Taylor",
      email: "json.taylor@example.com",
      role: "Autor",
      photo: "/images/faces/1.jpg",
      password: "",
      newPassword: "",
      confirmPassword: "",
    };
  
    function handleSave() {
      // Aqui vai sua lógica para salvar perfil
      console.log("Perfil salvo:", user);
    }
  
    function handleUpload(event) {
      const file = event.target.files[0];
      if (file) {
        user.photo = URL.createObjectURL(file);
      }
    }
  </script>
  
  <svelte:head>
    <title>Meu Perfil | Plataforma do Autor</title>
  </svelte:head>
  
  <Row class="my-4">
    <Col xl={4} class="mb-4">
      <SpkBasicCard cardProps="custom-card text-center" headerTitle="Foto de Perfil">
        <div slot="content">
          <img src={user.photo} alt="Foto do usuário" class="rounded-circle mb-3" width="120" height="120" />
          <div class="mb-3">
            <input type="file" accept="image/*" class="form-control" on:change={handleUpload} />
          </div>
        </div>
      </SpkBasicCard>
    </Col>
  
    <Col xl={8}>
      <SpkBasicCard cardProps="custom-card" headerTitle="Informações da Conta">
        <div slot="content">
          <Form>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="name">Nome</Label>
                  <Input id="name" type="text" bind:value={user.name} />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="email">Email</Label>
                  <Input id="email" type="email" bind:value={user.email} />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="role">Função</Label>
                  <Input id="role" type="text" value={user.role} disabled />
                </FormGroup>
              </Col>
            </Row>
  
            <hr class="my-4" />
  
            <h6 class="fw-semibold mb-3">Alterar Senha</h6>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="password">Senha Atual</Label>
                  <Input id="password" type="password" bind:value={user.password} />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="newPassword">Nova Senha</Label>
                  <Input id="newPassword" type="password" bind:value={user.newPassword} />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="confirmPassword">Confirmar Nova Senha</Label>
                  <Input id="confirmPassword" type="password" bind:value={user.confirmPassword} />
                </FormGroup>
              </Col>
            </Row>
  
            <div class="text-end mt-4">
              <SpkButton color="primary" text="Salvar Alterações" onclickfunc={handleSave} />
            </div>
          </Form>
        </div>
      </SpkBasicCard>
    </Col>
  </Row>
  