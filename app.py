from flask import Flask, send_from_directory, redirect
import os


app = Flask(__name__)


# Redirect root to English homepage
@app.route('/')
def home():
    return redirect('/en', code=302)


# Serve English index.html
@app.route('/en')
def serve_en_index():
    return send_from_directory('en', 'index.html')


# Serve Arabic index.html
@app.route('/ar')
def serve_ar_index():
    return send_from_directory('ar', 'index.html')



# Serve static files for English, redirect to error if not found
@app.route('/en/<path:path>')
def serve_en_file(path):
    full_path = os.path.join('en', path)
    if os.path.isfile(full_path):
        return send_from_directory('en', path)
    return redirect('/error/error.html')



# Serve static files for Arabic, redirect to error if not found
@app.route('/ar/<path:path>')
def serve_ar_file(path):
    full_path = os.path.join('ar', path)
    if os.path.isfile(full_path):
        return send_from_directory('ar', path)
    return redirect('/error/error.html')




# Strict error handling: only allow /en, /ar, and static assets
@app.route('/<path:filename>')
def serve_global_static(filename):
    allowed_ext = ('.css', '.js', '.png', '.jpg', '.jpeg', '.svg', '.ico')
    # Allow direct serving of the error page
    if filename == 'error/error.html' and os.path.isfile(filename):
        return send_from_directory('.', filename)
    # Only allow static assets if the request is from /en or /ar or error page
    if filename.endswith(allowed_ext) and os.path.isfile(filename):
        # Only allow if the referer is from /en, /ar, or error page
        from flask import request
        referer = request.headers.get('Referer', '')
        if referer.endswith('/en') or referer.endswith('/ar') or '/error/' in referer:
            return send_from_directory('.', filename)
        # Otherwise, block direct access
        return redirect('/error/error.html')
    # Block any URL manipulation or operations except /en or /ar
    if not (filename.startswith('en') or filename.startswith('ar')):
        return redirect('/error/error.html')
    # If /en or /ar but file not found, also show error
    return redirect('/error/error.html')


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
