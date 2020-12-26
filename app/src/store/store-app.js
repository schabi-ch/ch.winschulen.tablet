import { LocalStorage, SessionStorage, Loading } from 'quasar'
import axios from "axios";

const state = {
  routerHistory: [],
  userMode: null,
  tasksDone: [],
  categoryTree: [],
  categories: [],
  currentCategory: null,
  articles: [],
  searchResults: null
};

const mutations = {
  setUserMode(state, user) {
    state.userMode = user;
    LocalStorage.set("userMode", user)
  },
  setAllTasksDone(state, tasksDone) {
    state.tasksDone = tasksDone;
  },
  setCategoryTree(state, payload) {
    state.categoryTree = payload;
  },
  setCategories(state, payload) {
    state.categories = payload;
  },
  setArticles(state, payload) {
    state.articles = payload;
  },
  setSearchResults(state, payload) {
    state.setSearchResults = payload;
  },
  setCurrentCategory(state, payload) {
    if (payload == null) {
      state.currentCategory = null;
      console.log("no currentCategory");
    } else {
      state.currentCategory = payload;
      console.log("currentCategory", state.currentCategory);

      if (state.currentCategory.articles == null) {
          console.log("no articles");
          // load all articles from server
          axios
            .get(
              process.env.API + "posts?categories=" + state.currentCategory.id
            )
            .then(response => {
              console.log("articles", response.data);
              var articles = [];
            
              //response.data.sort((a,b) => (a.description > b.description) ? 1 : ((b.description > a.description) ? -1 : 0)); 
              response.data.forEach(n => {
                var done = state.tasksDone.includes(n.id) ? true : false;
                var article = { id: n.id, title: n.title.rendered, done: done };
                articles.push(article);
              });
              mutations.setArticlesForCategory(state, { id: state.currentCategory.id, articles: articles});
            })
            .catch(error => {
              this.error = error;
              console.log("error", error);
            });
        } else {
          console.log("yes articles");
        }
    }
  },
  setArticlesForCategory(state, payload) {
    var index = state.categories.findIndex(i => i.id == payload.id);
    state.categories[index].articles = payload.articles;
    if (state.currentCategory != null & state.currentCategory.id == payload.id) {
      state.currentCategory = {
        ...state.currentCategory,
        articles: payload.articles
      };
      console.log("update currentCategory", state.currentCategory);
    }
  },
  setTaskDone(state, payload) {
    if (payload.value) {
      // task done
      state.tasksDone.push(payload.id);
    } else {
      // task undone
      var index = state.tasksDone.indexOf(payload.id);
      state.tasksDone.splice(index, 1);
    }
    LocalStorage.set("tasksDone", state.tasksDone);
  }
};

const actions = {
  async init({commit, dispatch}) {
    console.log("init - load stuff")
      dispatch("getAllTasksDone");

      // --------------------
      // load all articles (max 100!)
      // --------------------
      var articles = [];
      await axios
      .get(process.env.API + "posts?per_page=100")
      .then(response => {
        response.data.forEach(a => {
            var article = { 
              id: a.id, 
              title: a.title.rendered, 
              subtitle: a.excerpt.rendered,
              content: a.content.rendered, 
              categories: a.categories, 
              date: new Date(a.date),
              done: state.tasksDone.includes(a.id) ? true : false
            };
            articles.push(article);
          });
      })
      .catch(error => {
        this.error = error;
        console.log("error", error);

      });

       // --------------------
      // load all categories
      // --------------------
      var categories = [];
      var categoryTree = [];
      await axios
        .get(
          process.env.API + "categories?per_page=100"
        )
        .then(response => {
          var firstLayer = response.data.filter(p => p.parent == 0);
          firstLayer.sort((a,b) => (a.description > b.description) ? 1 : ((b.description > a.description) ? -1 : 0)); 
          firstLayer.forEach(n => {
            var newNode = { id: n.id, label: n.name };
            // articles, order articles by date ascending
            var articlesForCategory =  articles.filter(f => f.categories.includes(n.id));
            articlesForCategory.sort((a,b) => a.date - b.date);
            //articlesForCategory.sort((a,b) => (a.date > b.date) ? 1 : ((b.date > a.date) ? -1 : 0)); 
            newNode.articles = articlesForCategory;
            newNode = buildTree(newNode, response.data, categories, articles);
            categoryTree.push(newNode);
            categories.push(newNode);
          });
        })
        .catch(error => {
          this.error = error;
          console.log("error", error);
        });
      
      commit("setCategoryTree",categoryTree);
      commit("setCategories",categories);
      commit("setArticles",articles);
  },
  setUserMode({ commit }, payload) { 
    commit("setUserMode", payload);
  },
  setTaskDone({ commit }, payload) {
    commit("setTaskDone", payload);
  },
  async setCurrentCategory({ commit }, payload) {
    commit("setCurrentCategory", payload);
  },
  getAllTasksDone({ commit }) {
    if (state.tasksDone.length == 0 && LocalStorage.has("tasksDone")) {
      commit("setAllTasksDone", LocalStorage.getItem("tasksDone"));
    }
    return state.tasksDone;
  },
  async getCategories({ commit }) {
    if (state.categories.length == 0 && SessionStorage.has("categories")) {
      commit("setCategoryTree",SessionStorage.getItem("categoryTree"));
      commit("setCategories",SessionStorage.getItem("categories"));
    } else if (state.categories.length == 0 && !SessionStorage.has("categories")) {
      // load and sort all categories from server
      var categories = [];
      var categoryTree = [];
     await axios
      .get(
        process.env.API + "categories?per_page=100"
      )
      .then(response => {
        var firstLayer = response.data.filter(p => p.parent == 0);
        firstLayer.sort((a,b) => (a.description > b.description) ? 1 : ((b.description > a.description) ? -1 : 0)); 
        firstLayer.forEach(n => {
          var newNode = { id: n.id, label: n.name, articles: [] };
          newNode = buildTree(newNode, response.data, categories);
          categoryTree.push(newNode);
          categories.push(newNode);
        });
        
      })
      .catch(error => {
        this.error = error;
        console.log("error", error);
      });
      commit("setCategoryTree",categoryTree);
      commit("setCategories",categories);
    }
    
    return state.categories;
  },
 async search({ commit }, searchString) {
    Loading.show();
    commit("setSearchResults", null);
      console.log("search:", searchString);
      await axios
        .get(process.env.API + "search?search=" + searchString)
        .then(response => {
            commit("setSearchResults",response.data);
            console.log("search result", response.data);
        })
        .catch(error => {
          console.log("error", error);
        });

      Loading.hide();
  },
};

function buildTree(node, data, categories, articles) {
  var nextLayer = data.filter(p => p.parent == node.id);
  nextLayer.sort((a,b) => (a.description > b.description) ? 1 : ((b.description > a.description) ? -1 : 0)); 
  if (nextLayer.length > 0) {
    node.children = [];
    nextLayer.forEach(n => {
      var newNode = { id: n.id, label: n.name };
       // articles, order articles by date ascending
      var articlesForCategory =  articles.filter(f => f.categories.includes(n.id));
      articlesForCategory.sort((a,b) => a.date - b.date);
      newNode.articles = articlesForCategory;
      newNode = buildTree(newNode, data, categories, articles);
      node.children.push(newNode);
      categories.push(newNode);
    });
  }
  return node;
}

const getters = {
  previousRoute: (state) => {
      const historyLen = state.routerHistory.length;
      if (historyLen == 0) return null;
      return state.routerHistory[historyLen - 1];
    },
  userMode: state => {
    return state.userMode;
  },
  tasksDone: state => {
    return state.tasksDone;
  },
  categoryTree: state => {
    return state.categoryTree;
  },
  categories: state => {
    return state.categories;
  },
  currentCategory: state => {
    return state.currentCategory;
  },
  searchResults: state => {
    return state.searchResults;
  }
};



export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};