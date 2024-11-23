import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { jwtDecode } from 'jwt-decode'
import { getUser } from '../../public/js/utils'

const routes = 
{
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('../views/account/LoginView.vue'),
    },
    {
      path: '/error',
      name: 'error',
      component: () => import('../views/error/ErrorView.vue'), 
    },
    {
      path: '/components',
      name: 'components', 
      component: () => import('../views/ComponentsView.vue'),
      beforeEnter(to, from, next) 
      {
        checkAuthorization(to, from, next, ['Administrador'])
      }
    },

    {
      path: '/Home',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      beforeEnter(to, from, next) 
      {
        checkAuthorization(to, from, next, ['Aluno', 'Representante', 'Responsável', 'Orientador', 'Coordenador', 'Diretor', 'Administrador'])
      }
    },
   
    /*graduatingClass: Turma*/
      {
        path: '/turmas',
        name: "Turmas",
        component: () => import('../views/graduatingClass/ReadView.vue'),
        beforeEnter(to, from, next) 
        {
          checkAuthorization(to, from, next, ['Aluno', 'Representante', 'Responsável', 'Orientador', 'Coordenador', 'Diretor', 'Administrador'])
        }
      },
      {
        path: '/turma',
        name: "Turma",
        component: () => import('../views/graduatingClass/ReadOneView.vue'),
        beforeEnter(to, from, next) 
        {
          checkAuthorization(to, from, next, ['Aluno', 'Representante', 'Responsável', 'Orientador', 'Coordenador', 'Diretor', 'Administrador'])
        }
      },
      {
        path: '/turma/criar',
        name: "Nova-Turma",
        component: () => import('../views/graduatingClass/CreateView.vue'),
        beforeEnter(to, from, next) 
        {
          checkAuthorization(to, from, next, ['Responsável', 'Administrador'])
        }
      },
      {
        path: '/turma/editar',
        name: "Editar-Turma",
        component: () => import('../views/graduatingClass/UpdateView.vue'),
        beforeEnter(to, from, next) 
        {
          checkAuthorization(to, from, next, ['Responsável', 'Administrador'])
        }
      },

    /*End of graduatingClass: Turma*/

    /*professor: Professor*/
      {
        path: '/professores',
        name: 'Professores',
        component: () => import('../views/professor/ReadView.vue'),
        beforeEnter(to, from, next) 
        {
          checkAuthorization(to, from, next, ['Coordenador', 'Diretor', 'Administrador'])
        }
      },
      {
        path: '/professor',
        name: 'Professor',
        component: () => import('../views/professor/ReadOneView.vue'),
        beforeEnter(to, from, next) 
        {
          checkAuthorization(to, from, next, ['Aluno', 'Representante', 'Responsável', 'Orientador', 'Coordenador', 'Diretor', 'Administrador'])
        }
      },
      {
        path: '/professor/criar',
        name: 'Novo-Professor',
        component: () => import('../views/professor/CreateView.vue'),
        beforeEnter(to, from, next) 
        {
          checkAuthorization(to, from, next, ['Administrador'])
        }
      },
      {
        path: '/professor/editar',
        name: 'Editar-Professor',
        component: () => import('../views/professor/UpdateView.vue'),
        beforeEnter(to, from, next) 
        {
          checkAuthorization(to, from, next, ['Administrador'])
        }
      },
    /*End of professor: Professor*/

    /*student: Estudante*/
    {
      path: '/estudantes',
      name: 'Estudantes',
      component: () => import('../views/student/ReadView.vue'),
      beforeEnter(to, from, next) 
      {
        checkAuthorization(to, from, next, ['Aluno', 'Representante', 'Responsável', 'Orientador', 'Coordenador', 'Diretor', 'Administrador'])
      }
    },
    {
      path: '/estudante',
      name: 'Estudante',
      component: () => import('../views/student/ReadOneView.vue'),
      beforeEnter(to, from, next) 
      {
        checkAuthorization(to, from, next, ['Aluno', 'Representante', 'Responsável', 'Orientador', 'Coordenador', 'Diretor', 'Administrador'])
      }
    },
    {
      path: '/estudante/criar',
      name: 'Novo-Estudante',
      component: () => import('../views/student/CreateView.vue'),
      beforeEnter(to, from, next) 
      {
        checkAuthorization(to, from, next, ['Responsável', 'Administrador'])
      }
    },
    {
      path: '/estudante/editar',
      name: 'Editar-Estudante',
      component: () => import('../views/student/UpdateView.vue'),
      beforeEnter(to, from, next) 
      {
        checkAuthorization(to, from, next, ['Responsável', 'Administrador'])
      }
    },
   
  /*End of student: Estudante*/

  /*subject: Disciplina*/
      {
        path: '/disciplinas',
        name: 'Disciplinas',
        component: () => import('../views/subject/ReadView.vue'),
        beforeEnter(to, from, next) 
        {
          checkAuthorization(to, from, next, ['Aluno', 'Representante', 'Responsável', 'Orientador', 'Coordenador', 'Diretor', 'Administrador'])
        }
      },
      {
        path: '/disciplina',
        name: 'Disciplina',
        component: () => import('../views/subject/ReadOneView.vue'),
        beforeEnter(to, from, next) 
        {
          checkAuthorization(to, from, next, ['Aluno', 'Representante', 'Responsável', 'Orientador', 'Coordenador', 'Diretor', 'Administrador'])
        }
      },
      {
        path: '/disciplina/criar',
        name: 'Nova-Disciplina',
        component: () => import('../views/subject/CreateView.vue'),
        beforeEnter(to, from, next) 
        {
          checkAuthorization(to, from, next, ['Coordenador', 'Administrador'])
        }
      },
      {
        path: '/disciplina/editar',
        name: 'Editar-Disciplina',
        component: () => import('../views/subject/UpdateView.vue'),
        beforeEnter(to, from, next) 
        {
          checkAuthorization(to, from, next, ['Coordenador', 'Administrador'])
        }
      },
    /*End of subject: Disciplina*/

    /*course: Curso*/
    {
      path: '/cursos',
      name: 'Cursos',
      component: () => import('../views/course/ReadView.vue'),
      beforeEnter(to, from, next) 
      {
        checkAuthorization(to, from, next, ['Aluno', 'Representante', 'Coordenador', 'Diretor', 'Administrador'])
      }
    },
    {
      path: '/curso',
      name: 'Curso',
      component: () => import('../views/course/ReadOneView.vue'),
      beforeEnter(to, from, next) 
      {
        checkAuthorization(to, from, next, ['Aluno', 'Representante', 'Responsável', 'Orientador', 'Coordenador', 'Diretor', 'Administrador'])
      }
    },
    {
      path: '/curso/criar',
      name: 'Novo-Curso',
      component: () => import('../views/course/CreateView.vue'),
      beforeEnter(to, from, next) 
      {
        checkAuthorization(to, from, next, ['Administrador'])
      }
    },
    {
      path: '/curso/editar',
      name: 'Editar-Curso',
      component: () => import('../views/course/UpdateView.vue'),
      beforeEnter(to, from, next) 
      {
        checkAuthorization(to, from, next, ['Administrador'])
      }
    },
  /*End of course: Curso*/
  
  /*task: Tarefas*/
    {
      path: '/tarefas',
      name: 'Tarefas',
      component: () => import('../views/task/ReadView.vue'),
      beforeEnter(to, from, next) 
      {
        checkAuthorization(to, from, next, ['Aluno', 'Representante', 'Responsável', 'Administrador'])
      }
    },
    {
      path: '/tarefa',
      name: 'Tarefa',
      component: () => import('../views/task/ReadOneView.vue'),
      beforeEnter(to, from, next) 
      {
        checkAuthorization(to, from, next, ['Aluno', 'Representante', 'Responsável', 'Administrador'])
      }
    },
    {
      path: '/tarefa/criar',
      name: 'Nova-Tarefa',
      component: () => import('../views/task/CreateView.vue'),
      beforeEnter(to, from, next) 
      {
        checkAuthorization(to, from, next, ['Responsável', 'Administrador'])
      }
    },
    {
      path: '/tarefa/editar',
      name: 'Editar-Tarefa',
      component: () => import('../views/task/UpdateView.vue'),
      beforeEnter(to, from, next) 
      {
        checkAuthorization(to, from, next, ['Responsável', 'Administrador'])
      }
    },
  /*End of task: Tarefas*/
  ],
}
const router = createRouter(routes)



function checkAuthorization(to, from, next, authorizedRoles) 
{
  const token = window.localStorage.getItem('token');
  const user = getUser(token);

  if (user) {

    // Verifica se o usuário possui pelo menos uma das permissões autorizadas
    const hasAuthorizedRole = user.permissoes.some(role => authorizedRoles.includes(role));

    if (!hasAuthorizedRole) {
      // Redireciona para a página de "Erro" com uma mensagem
      return next({
        path: '/error',
        query: { error: 'Você não tem permissão para acessar esta página.' }
      });
    }

    // Permite a navegação
    return next();
  }

  // Redireciona para a página de login
  return next('/');
}


router.beforeEach((to, from, next) => 
{
  to.params.user = getUser(window.localStorage.getItem('token'))
  next();
});
export default router;
