from flask import Flask, request, render_template_string
import os

app = Flask(__name__)

@app.route('/')
def index():
    return render_template_string(open("index.html").read())

@app.route('/generate_code', methods=['POST'])
def generate_code():
    # Retrieve the POST data (color and personality values)
    red = int(request.form.get('red'))
    green = int(request.form.get('green'))
    blue = int(request.form.get('blue'))
    personality1 = int(request.form.get('personality1'))
    personality2 = int(request.form.get('personality2'))
    personality3 = int(request.form.get('personality3'))

    # Generate code based on the values
    generated_code = f"""
    // Create a cube with the selected color
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({{ color: 0x{rgb_to_hex(red, green, blue)} }});
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // Set personality traits for the cube
    cube.personality = {{
        trait1: {personality1},
        trait2: {personality2},
        trait3: {personality3}
    }};
    """

    return generated_code

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=int(os.environ.get('PORT', 8080)))
