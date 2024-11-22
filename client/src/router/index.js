import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/components',
      name: 'components',
      component: () => import('../views/ComponentsView.vue'),
    },

   
    /*graduatingClass: Turma*/
      {
        path: '/turmas',
        name: "Turmas",
        component: () => import('../views/graduatingClass/ReadView.vue'),
      },
      {
        path: '/turma/:id',
        name: "Turma",
        component: () => import('../views/graduatingClass/ReadOneView.vue'),
      },
      {
        path: '/turma/criar',
        name: "Nova-Turma",
        component: () => import('../views/graduatingClass/CreateView.vue'),
      },
      {
        path: '/turma/editar/:id',
        name: "Editar-Turma",
        component: () => import('../views/graduatingClass/UpdateView.vue'),
      },

    /*End of graduatingClass: Turma*/

    /*professor: Professor*/
      {
        path: '/professores',
        name: 'Professores',
        component: () => import('../views/professor/ReadView.vue'),
      },
      {
        path: '/professor/:id',
        name: 'Professor',
        component: () => import('../views/professor/ReadOneView.vue'),
      },
      {
        path: '/professor/criar',
        name: 'Novo-Professor',
        component: () => import('../views/professor/CreateView.vue'),
      },
      {
        path: '/professor/editar/:id',
        name: 'Editar-Professor',
        component: () => import('../views/professor/UpdateView.vue'),
      },
    /*End of professor: Professor*/

    /*student: Estudante*/
    {
      path: '/estudantes',
      name: 'Estudantes',
      component: () => import('../views/student/ReadView.vue'),
    },
    {
      path: '/estudante/:id',
      name: 'Estudante',
      component: () => import('../views/student/ReadOneView.vue'),
    },
    {
      path: '/estudante/criar',
      name: 'Novo-Estudante',
      component: () => import('../views/student/CreateView.vue'),
    },
    {
      path: '/estudante/editar/:id',
      name: 'Editar-Estudante',
      component: () => import('../views/student/UpdateView.vue'),
    },
   
  /*End of student: Estudante*/

  /*subject: Disciplina*/
      {
        path: '/disciplinas',
        name: 'Disciplinas',
        component: () => import('../views/subject/ReadView.vue'),
      },
      {
        path: '/disciplina/:id',
        name: 'Disciplina',
        component: () => import('../views/subject/ReadOneView.vue'),
      },
      {
        path: '/disciplina/criar',
        name: 'Nova-Disciplina',
        component: () => import('../views/subject/CreateView.vue'),
      },
      {
        path: '/disciplina/editar/:id',
        name: 'Editar-Disciplina',
        component: () => import('../views/subject/UpdateView.vue'),
      },
    /*End of subject: Disciplina*/

    /*course: Curso*/
    {
      path: '/cursos',
      name: 'Cursos',
      component: () => import('../views/course/ReadView.vue'),
    },
    {
      path: '/curso/:id',
      name: 'Curso',
      component: () => import('../views/course/ReadOneView.vue'),
    },
    {
      path: '/curso/criar',
      name: 'Novo-Curso',
      component: () => import('../views/course/CreateView.vue'),
    },
    {
      path: '/curso/editar/:id',
      name: 'Editar-Curso',
      component: () => import('../views/course/UpdateView.vue'),
    },
  /*End of course: Curso*/
  ],
})

export default router
