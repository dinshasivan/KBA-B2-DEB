let movieArray=[];
let genreArray=[];

function addMovie(){
    const movieTitle=document.getElementById('title');
    const movieGenre=document.getElementById('genre');
    
    const movieList=document.getElementById('movie_list');

    let movies=movieTitle.value.trim();
    let genre=movieGenre.value;

    if(movieTitle!='' && movieGenre!=''){
        movieArray.push(movies);
        genreArray.push(genre);

        // console.log(movieArray);
        // console.log(genreArray);

        const li=document.createElement('li');
        li.textContent=movies +' is '+ genre +' movie';

        switch(genre){
            case 'action':
                li.classList.add('genre_action');
                break;
            case 'comedy':
                li.classList.add('genre_comedy');
                break;
            case 'drama':
                li.classList.add('genre_drama')
        }
        movieList.appendChild(li);

        let watchedbtn=document.createElement('button');
        watchedbtn.textContent="Watched";
        watchedbtn.onclick=function(){
            li.classList.add('watched_movie')
        }
        li.appendChild(watchedbtn);

        let editbtn=document.createElement('button');
        editbtn.textContent="Edit Title";
        editbtn.onclick=function(){
            let newTitle=prompt("Edit movie title",movies);

            
            if(newTitle!='' && newTitle.trim()!=''){
                const movieIndext=movieArray.indexOf(movies); 
                // const genreIndex=genreArray.indexOf(genre)
                movieArray[movieIndext]=newTitle;
                li.firstChild.textContent=newTitle + ' is '+ genre + ' movie';
                movies=newTitle;
               
            }
           li.classList.add('edit_title');
           
            
        }
        li.appendChild(editbtn);

        let removebtn=document.createElement('button');
        removebtn.textContent="Remove Movie";
        removebtn.onclick=function(){
            movieList.removeChild(li);
            const movieIndextIndex =movieArrayArray.indexOf(movies);
            movieArrayArray.splice(movieIndextIndex,1);
            genreArray.splice(movieIndextIndex,1);
            
            
        }
        li.appendChild(removebtn);
        movies.value='';
        genre.value='';
      
        
        
    }
   else{
    console.log('enter valid details');
   }

// localStorage.setItem('movies',movieArray);

// let getMovies=localStorage.getItem('movies');
// console.log(getMovies);


}


// function moviesSaveToLocalStorage(movies){
//     let saveMovie=localStorage.setItem('movie',[]);

//     console.log(saveMovie);

// }