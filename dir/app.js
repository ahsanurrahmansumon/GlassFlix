        document.addEventListener('DOMContentLoaded', () => {
            // --- DATA ---
            const movies = [
                // English
                { title: 'Dune: Prophecy', genre: 'Sci-Fi, Adventure', language: 'English', releaseDate: '2025-03-15', poster: 'https://placehold.co/400x600/0f172a/FFF?text=Dune', downloadLink: '#' },
                { title: 'The Creator', genre: 'Sci-Fi, Action', language: 'English', releaseDate: '2024-09-29', poster: 'https://placehold.co/400x600/1e293b/FFF?text=Creator', downloadLink: '#' },
                { title: 'Oppenheimer', genre: 'Biography, Drama', language: 'English', releaseDate: '2023-07-21', poster: 'https://placehold.co/400x600/334155/FFF?text=Oppenheimer', downloadLink: '#' },
                { title: 'Blade Runner 2049', genre: 'Sci-Fi, Drama', language: 'English', releaseDate: '2017-10-06', poster: 'https://placehold.co/400x600/475569/FFF?text=Blade+Runner', downloadLink: '#' },
                { title: 'John Wick: Chapter 4', genre: 'Action, Thriller', language: 'English', releaseDate: '2023-03-24', poster: 'https://placehold.co/400x600/4f46e5/FFF?text=John+Wick+4', downloadLink: '#' },
                { title: 'Across the Spider-Verse', genre: 'Animation, Action', language: 'English', releaseDate: '2023-06-02', poster: 'https://placehold.co/400x600/6366f1/FFF?text=Spider-Verse', downloadLink: '#' },
                
                // Animation
                { title: 'Spirited Away', genre: 'Animation, Fantasy', language: 'English', releaseDate: '2001-07-20', poster: 'https://placehold.co/400x600/22d3ee/000?text=Spirited+Away', downloadLink: '#' },
                { title: 'Your Name', genre: 'Animation, Romance', language: 'English', releaseDate: '2016-08-26', poster: 'https://placehold.co/400x600/67e8f9/000?text=Your+Name', downloadLink: '#' },
                { title: 'Klaus', genre: 'Animation, Comedy', language: 'English', releaseDate: '2019-11-08', poster: 'https://placehold.co/400x600/a5f3fc/000?text=Klaus', downloadLink: '#' },

                // Hindi
                { title: 'Fighter', genre: 'Action, Thriller', language: 'Hindi', releaseDate: '2025-01-25', poster: 'https://placehold.co/400x600/7c2d12/FFF?text=Fighter', downloadLink: '#' },
                { title: 'Jawan', genre: 'Action, Thriller', language: 'Hindi', releaseDate: '2023-09-07', poster: 'https://placehold.co/400x600/9a3412/FFF?text=Jawan', downloadLink: '#' },
                { title: '3 Idiots', genre: 'Comedy, Drama', language: 'Hindi', releaseDate: '2009-12-25', poster: 'https://placehold.co/400x600/b45309/FFF?text=3+Idiots', downloadLink: '#' },
                { title: 'RRR', genre: 'Action, Drama', language: 'Hindi', releaseDate: '2022-03-24', poster: 'https://placehold.co/400x600/d97706/FFF?text=RRR', downloadLink: '#' },
                
                // Bangla
                { title: 'Toofan', genre: 'Action, Drama', language: 'Bangla', releaseDate: '2025-06-10', poster: 'https://placehold.co/400x600/065f46/FFF?text=Toofan', downloadLink: '#' },
                { title: 'Debi', genre: 'Mystery, Thriller', language: 'Bangla', releaseDate: '2018-10-19', poster: 'https://placehold.co/400x600/047857/FFF?text=Debi', downloadLink: '#' },
                { title: 'Hawa', genre: 'Drama, Mystery', language: 'Bangla', releaseDate: '2022-07-29', poster: 'https://placehold.co/400x600/059669/FFF?text=Hawa', downloadLink: '#' },
                { title: 'Priyotoma', genre: 'Romance, Action', language: 'Bangla', releaseDate: '2023-06-29', poster: 'https://placehold.co/400x600/10b981/000?text=Priyotoma', downloadLink: '#' },
            ];

            // --- DOM ELEMENTS ---
            const menuToggle = document.getElementById('menu-toggle');
            const navContent = document.getElementById('nav-content');
            const searchInput = document.getElementById('searchInput');
            const movieSectionsContainer = document.getElementById('movie-sections');
            const searchResultsContainer = document.getElementById('search-results');
            const searchResultsGrid = document.getElementById('search-results-grid');
            const noResults = document.getElementById('no-results');
            
            const mostViewedSlider = document.getElementById('most-viewed-slider');
            const recentGrid = document.getElementById('recent-movie-grid');
            const animationGrid = document.getElementById('animation-movie-grid');
            const englishGrid = document.getElementById('english-movie-grid');
            const hindiGrid = document.getElementById('hindi-movie-grid');
            const banglaGrid = document.getElementById('bangla-movie-grid');

            /**
             * Renders movie posters for the auto-sliding carousel.
             * @param {Array} movieList - The array of movie objects for the slider.
             * @param {HTMLElement} sliderElement - The slider container element.
             */
            const displaySliderMovies = (movieList, sliderElement) => {
                sliderElement.innerHTML = '';
                const sliderContent = [...movieList, ...movieList]; // Duplicate for seamless loop

                sliderContent.forEach(movie => {
                    const slideItem = document.createElement('div');
                    slideItem.className = 'slide-item relative group';
                    slideItem.innerHTML = `
                        <img src="${movie.poster}" alt="${movie.title}" class="w-full h-full object-cover">
                        <a href="${movie.downloadLink}" class="absolute inset-0 bg-black/70 flex flex-col items-center justify-center text-center p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <h3 class="font-bold text-sm mb-2">${movie.title}</h3>
                            <span class="bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold py-1 px-3 rounded-full transition-colors duration-300">
                                Download
                            </span>
                        </a>
                    `;
                    sliderElement.appendChild(slideItem);
                });
            };

            /**
             * Renders a list of movies to a specified grid element.
             * @param {Array} movieList - The array of movie objects to display.
             * @param {HTMLElement} gridElement - The grid container to append movie cards to.
             */
            const displayMovies = (movieList, gridElement) => {
                gridElement.innerHTML = ''; // Clear existing movies from the grid
                if (!movieList || movieList.length === 0) return;

                movieList.forEach(movie => {
                    const movieCard = document.createElement('div');
                    movieCard.className = 'movie-card relative rounded-xl overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 ease-in-out cursor-pointer';
                    
                    movieCard.innerHTML = `
                        <img src="${movie.poster}" alt="${movie.title}" class="w-full h-full object-cover" onerror="this.onerror=null;this.src='https://placehold.co/400x600/1e293b/FFF?text=Image+Not+Found';">
                        <div class="overlay absolute inset-0 glass-effect flex flex-col justify-end p-4">
                            <h3 class="font-bold text-lg">${movie.title}</h3>
                            <p class="text-sm text-gray-300 mb-3">${movie.genre}</p>
                            <a href="${movie.downloadLink}" class="bg-blue-700 hover:bg-blue-800 text-white text-center text-sm font-semibold py-2 px-4 rounded-lg transition-colors duration-300 w-full">
                                Download
                            </a>
                        </div>
                    `;
                    gridElement.appendChild(movieCard);
                });
            };

            /**
             * Populates all the movie sections on the homepage.
             */
            const populateHomepage = () => {
                const mostViewedMovies = [movies[1], movies[2], movies[4], movies[6], movies[10], movies[12], movies[15]];
                
                // Recent movies: Released in the last 1.5 years
                const oneAndHalfYearsAgo = new Date();
                oneAndHalfYearsAgo.setMonth(oneAndHalfYearsAgo.getMonth() - 18);

                const recentMovies = movies
                    .filter(movie => new Date(movie.releaseDate) > oneAndHalfYearsAgo)
                    .sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));

                const animationMovies = movies.filter(movie => movie.genre.toLowerCase().includes('animation'));
                const englishMovies = movies.filter(movie => movie.language === 'English');
                const hindiMovies = movies.filter(movie => movie.language === 'Hindi');
                const banglaMovies = movies.filter(movie => movie.language === 'Bangla');

                displaySliderMovies(mostViewedMovies, mostViewedSlider);
                displayMovies(recentMovies, recentGrid);
                displayMovies(animationMovies, animationGrid);
                displayMovies(englishMovies, englishGrid);
                displayMovies(hindiMovies, hindiGrid);
                displayMovies(banglaMovies, banglaGrid);
            };

            /**
             * Handles the search functionality.
             */
            const handleSearch = () => {
                const searchTerm = searchInput.value.toLowerCase().trim();
                
                if (!searchTerm) {
                    // If search is empty, show homepage sections and hide search results
                    movieSectionsContainer.classList.remove('hidden');
                    searchResultsContainer.classList.add('hidden');
                    return;
                }
                
                // If search has text, hide homepage and show search results
                movieSectionsContainer.classList.add('hidden');
                searchResultsContainer.classList.remove('hidden');

                const filteredMovies = movies.filter(movie => 
                    movie.title.toLowerCase().includes(searchTerm) || 
                    movie.genre.toLowerCase().includes(searchTerm)
                );
                
                displayMovies(filteredMovies, searchResultsGrid);

                // Show or hide the 'no results' message
                if (filteredMovies.length === 0) {
                    noResults.classList.remove('hidden');
                } else {
                    noResults.classList.add('hidden');
                }
            };

            // --- EVENT LISTENERS ---
            searchInput.addEventListener('input', handleSearch);

            menuToggle.addEventListener('click', () => {
                navContent.classList.toggle('hidden');
                navContent.classList.toggle('flex');
            });

            // --- INITIALIZATION ---
            populateHomepage();
            
            // Automatically update copyright year
            document.getElementById('copyright-year').textContent = new Date().getFullYear();
        });