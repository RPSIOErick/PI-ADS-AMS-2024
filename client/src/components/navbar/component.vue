<script setup>
</script>


<style src="./style.css"></style>

<template>
  <!-- Navbar -->        
    <nav class="navbar fixed-top navbar-custom navbar-dark">
        <div class="container-fluid">

                <!-- icon menu -->
                <button class="navbar-toggler iconMenu" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <!-- Título (versão mobile) -->
                <a class="navbar-brand position-absolute top-50 start-50 translate-middle titleSiteMobile text-white" href="/home">
                    SGTF
                </a>

                <a href="/login" v-if="!this.$route.params.user">Fazer Login</a>

                <a  :href="'/professor/editar/'" v-if="this.$route.params.user"> 
                  {{ this.$route.params.user.nome }}
                </a>

                <!-- menu -->
                <div class="offcanvas-end offcanvas" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">

                    <!-- header -->
                    <div class="offcanvas-header text-white bg-dark">
                        <h5 class="offcanvas-title" id="offcanvasNavbarLabel">SGTF</h5>
                        <button type="button" class="btn-close bg-light" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                
                    <!-- body -->
                    <div class="offcanvas-body bg-dark">
                        <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
                          <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="/home">Home</a>
                          </li>

                          <li class="nav-item">
                            <a class="nav-link" aria-current="page" href="/cursos">Cursos</a>
                          </li>

                          <li class="nav-item">
                            <a class="nav-link" aria-current="page" href="/disciplinas">Disciplinas</a>
                          </li>

                          <li class="nav-item">
                            <a class="nav-link" aria-current="page" href="/turmas">Turmas</a>
                          </li>

                          <li class="nav-item">
                            <a class="nav-link" aria-current="page" href="/tarefas">Tarefas</a>
                          </li>

                                              <li class="nav-item">
                            <a class="nav-link" aria-current="page" href="/estudantes">Estudantes</a>
                          </li>
                          
                          <li class="nav-item">
                            <a class="nav-link" aria-current="page" href="/professores">Professores</a>
                          </li>
                                   
                        </ul>                  
                    </div>
                </div>
            </div>
        </nav>
    <!-- (fim) navbar -->
</template>

<script>
  export default {
    name: 'Navbar',
  }
</script>
