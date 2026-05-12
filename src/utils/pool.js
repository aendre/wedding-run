export function killSprite(sprite) {
  sprite.setActive(false).setVisible(false);
  sprite.body.stop();
  sprite.body.enable = false;
}

export function resetSprite(sprite, x, y) {
  sprite.enableBody(true, x, y, true, true);
}

export function isOutOfBounds(sprite) {
  return sprite.x < -sprite.width || sprite.x > sprite.scene.scale.width + sprite.width;
}

export function killIfOutOfBounds(sprite) {
  if (sprite.active && isOutOfBounds(sprite)) {
    killSprite(sprite);
  }
}
