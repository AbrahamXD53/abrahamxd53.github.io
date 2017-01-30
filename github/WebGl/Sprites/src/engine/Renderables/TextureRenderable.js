function TextureRenderable(myTexure)
{
    Renderable.call(this);
    Renderable.prototype.setColor.call(this,[1,1,1,0]);
    Renderable.prototype._setShader.call(this,gEngine.DefaultResources.getTextureSahder());
    this.mTexture = myTexure;
}

gEngine.Core.inheritPrototype(TextureRenderable,Renderable);

TextureRenderable.prototype.draw= function (vpMatrix){
    
    gEngine.Textures.activateTexture(this.mTexture);
    Renderable.prototype.draw.call(this,vpMatrix);
};

TextureRenderable.prototype.setTexture= function (t){ this.mTexture=t;};
TextureRenderable.prototype.getTexture= function (){ return this.mTexture=t;};

