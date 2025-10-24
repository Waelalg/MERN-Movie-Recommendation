# save this as generate_pkl_files.py in Movie_Python folder
import pandas as pd
import pickle
import ast
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel
import os

def load_and_merge_data():
    """Load and merge movies and credits data"""
    try:
        movies_df = pd.read_csv('../ML_Model/movies.csv')
        credits_df = pd.read_csv('../ML_Model/credits.csv')
        
        print(f"Loaded movies: {len(movies_df)}")
        print(f"Loaded credits: {len(credits_df)}")
        
        # Merge datasets
        movies_df = movies_df.merge(credits_df, left_on='id', right_on='movie_id', how='left')
        
        print(f"Merged dataset: {len(movies_df)} movies")
        return movies_df
        
    except Exception as e:
        print(f"Error loading data: {e}")
        return None

def extract_genres(genres_str):
    """Extract genre names from JSON string"""
    try:
        if pd.isna(genres_str):
            return ""
        genres_list = ast.literal_eval(genres_str)
        return ' '.join([genre['name'] for genre in genres_list])
    except:
        return ""

def extract_keywords(keywords_str):
    """Extract keyword names from JSON string"""
    try:
        if pd.isna(keywords_str):
            return ""
        keywords_list = ast.literal_eval(keywords_str)
        return ' '.join([keyword['name'] for keyword in keywords_list])
    except:
        return ""

def extract_cast(cast_str):
    """Extract top 3 cast members"""
    try:
        if pd.isna(cast_str):
            return ""
        cast_list = ast.literal_eval(cast_str)
        top_cast = [person['name'] for person in cast_list[:3]]
        return ' '.join(top_cast)
    except:
        return ""

def extract_director(crew_str):
    """Extract director from crew"""
    try:
        if pd.isna(crew_str):
            return ""
        crew_list = ast.literal_eval(crew_str)
        directors = [person['name'] for person in crew_list if person['job'] == 'Director']
        return ' '.join(directors)
    except:
        return ""

def preprocess_data(movies_df):
    """Preprocess the movie data"""
    # Fill NaN values
    movies_df['overview'] = movies_df['overview'].fillna('')
    movies_df['genres'] = movies_df['genres'].fillna('[]')
    movies_df['keywords'] = movies_df['keywords'].fillna('[]')
    movies_df['cast'] = movies_df['cast'].fillna('[]')
    movies_df['crew'] = movies_df['crew'].fillna('[]')
    
    # Extract features
    movies_df['genres_processed'] = movies_df['genres'].apply(extract_genres)
    movies_df['keywords_processed'] = movies_df['keywords'].apply(extract_keywords)
    movies_df['cast_processed'] = movies_df['cast'].apply(extract_cast)
    movies_df['director_processed'] = movies_df['crew'].apply(extract_director)
    
    # Combine features
    movies_df['combined_features'] = (
        movies_df['overview'] + ' ' +
        movies_df['genres_processed'] + ' ' +
        movies_df['keywords_processed'] + ' ' +
        movies_df['cast_processed'] + ' ' +
        movies_df['director_processed']
    )
    
    movies_df['combined_features'] = movies_df['combined_features'].fillna('')
    return movies_df

def create_similarity_matrix(movies_df):
    """Create cosine similarity matrix"""
    print("Creating TF-IDF matrix...")
    
    tfidf = TfidfVectorizer(stop_words='english', max_features=5000)
    tfidf_matrix = tfidf.fit_transform(movies_df['combined_features'])
    
    print(f"TF-IDF matrix shape: {tfidf_matrix.shape}")
    
    cosine_sim = linear_kernel(tfidf_matrix, tfidf_matrix)
    print(f"Similarity matrix shape: {cosine_sim.shape}")
    
    return cosine_sim

def generate_pkl_files():
    """Main function to generate PKL files"""
    print("🚀 Starting PKL file generation...")
    
    movies_df = load_and_merge_data()
    if movies_df is None:
        print("❌ Failed to load data")
        return
    
    print("🔄 Preprocessing data...")
    movies_df = preprocess_data(movies_df)
    
    similarity_matrix = create_similarity_matrix(movies_df)
    
    # Create movie dictionary for Django API
    movie_dict = {
        'movie_id': movies_df['id'].tolist(),
        'title': movies_df['title_x'].tolist(),  # Use title from movies.csv
        'genres': movies_df['genres_processed'].tolist(),
        'overview': movies_df['overview'].tolist()
    }
    
    # Save files
    print("💾 Saving PKL files...")
    
    with open('movie_dict.pkl', 'wb') as f:
        pickle.dump(movie_dict, f)
    
    with open('similarity.pkl', 'wb') as f:
        pickle.dump(similarity_matrix, f)
    
    print("✅ PKL files generated successfully!")
    print(f"📁 movie_dict.pkl - Contains {len(movie_dict['movie_id'])} movies")
    print(f"📁 similarity.pkl - Similarity matrix shape: {similarity_matrix.shape}")

if __name__ == "__main__":
    generate_pkl_files()