import { templateDefinitions } from '../../constants';
import type { DesignInputs, TemplateDefinition, TemplateVariant } from '../../types';

interface TemplateCanvasProps {
  inputs: DesignInputs;
  variant: TemplateVariant;
}

interface VariantProps {
  definition: TemplateDefinition;
  description: string;
  hasDescription: boolean;
  priceText: string;
  title: string;
}

function HeroOverlayTemplate({
  definition,
  description,
  hasDescription,
  priceText,
  title,
}: VariantProps) {
  return (
    <>
      <div className="template-overlay template-overlay--hero" />
      <div className="template-hero">
        <div className="template-copy">
          <h2 className="template-title template-title--hero">{title}</h2>
          {hasDescription ? (
            <p className="template-description template-description--hero">
              {description}
            </p>
          ) : null}
        </div>

        <div className="template-hero__footer">
          <div className="price-chip">
            <span className="price-chip__label">{definition.priceLabel}</span>
            <strong className="price-chip__value">{priceText}</strong>
          </div>
        </div>
      </div>
    </>
  );
}

function GlassCardTemplate({
  definition,
  description,
  hasDescription,
  priceText,
  title,
}: VariantProps) {
  return (
    <>
      <div className="template-overlay template-overlay--glass" />
      <div className="template-glass">
        <div className="glass-card">
          <div className="glass-card__copy">
            <h2 className="template-title">{title}</h2>
            {hasDescription ? (
              <p className="template-description">{description}</p>
            ) : null}
          </div>

          <div className="glass-card__price">
            <span className="glass-card__label">{definition.priceLabel}</span>
            <strong className="glass-card__value">{priceText}</strong>
          </div>
        </div>
      </div>
    </>
  );
}

function SplitPromoTemplate({
  definition,
  description,
  hasDescription,
  priceText,
  title,
}: VariantProps) {
  return (
    <>
      <div className="template-overlay template-overlay--split" />
      <div className="template-split">
        <div className="split-panel">
          <h2 className="template-title template-title--split">{title}</h2>
          {hasDescription ? (
            <p className="template-description template-description--split">
              {description}
            </p>
          ) : null}

          <div className="split-panel__spacer" />

          <div className="split-price">
            <span className="split-price__label">{definition.priceLabel}</span>
            <strong className="split-price__value">{priceText}</strong>
          </div>
        </div>
      </div>
    </>
  );
}

function BottomBandTemplate({
  definition,
  description,
  hasDescription,
  priceText,
  title,
}: VariantProps) {
  return (
    <>
      <div className="template-overlay template-overlay--bottom-band" />
      <div className="template-bottom-band">
        <div className="bottom-band">
          <div className="bottom-band__copy">
            <h2 className="template-title template-title--band">{title}</h2>
            {hasDescription ? (
              <p className="template-description template-description--band">
                {description}
              </p>
            ) : null}
          </div>

          <div className="bottom-band__meta">
            <div className="bottom-band__price">
              <span className="bottom-band__label">{definition.priceLabel}</span>
              <strong className="bottom-band__value">{priceText}</strong>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function TopFrameTemplate({
  definition,
  description,
  hasDescription,
  priceText,
  title,
}: VariantProps) {
  return (
    <>
      <div className="template-overlay template-overlay--top-frame" />
      <div className="template-top-frame">
        <div className="top-frame__panel">
          <div className="top-frame__row">
            <div className="top-frame__copy">
              <h2 className="template-title template-title--frame">{title}</h2>
              {hasDescription ? (
                <p className="template-description template-description--frame">
                  {description}
                </p>
              ) : null}
            </div>

            <div className="top-frame__aside">
              <div className="top-frame__price">
                <span className="top-frame__label">{definition.priceLabel}</span>
                <strong className="top-frame__value">{priceText}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function CenteredFocusTemplate({
  definition,
  description,
  hasDescription,
  priceText,
  title,
}: VariantProps) {
  return (
    <>
      <div className="template-overlay template-overlay--centered-focus" />
      <div className="template-centered-focus">
        <div className="centered-focus-card">
          <h2 className="template-title template-title--centered">{title}</h2>
          {hasDescription ? (
            <p className="template-description template-description--centered">
              {description}
            </p>
          ) : null}

          <div className="centered-focus-card__footer">
            <div className="centered-focus-card__price">
              <span className="centered-focus-card__label">
                {definition.priceLabel}
              </span>
              <strong className="centered-focus-card__value">{priceText}</strong>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function renderVariant(variant: TemplateVariant, props: VariantProps) {
  switch (variant) {
    case 'glass-card':
      return <GlassCardTemplate {...props} />;
    case 'split-promo':
      return <SplitPromoTemplate {...props} />;
    case 'bottom-band':
      return <BottomBandTemplate {...props} />;
    case 'top-frame':
      return <TopFrameTemplate {...props} />;
    case 'centered-focus':
      return <CenteredFocusTemplate {...props} />;
    case 'hero-overlay':
    default:
      return <HeroOverlayTemplate {...props} />;
  }
}

export function TemplateCanvas({ inputs, variant }: TemplateCanvasProps) {
  const definition =
    templateDefinitions.find((template) => template.id === variant) ??
    templateDefinitions[0];

  const title = inputs.title.trim() || 'Travel eSIM that keeps you connected';
  const priceText = inputs.priceText.trim() || '$9.99';
  const description = inputs.description.trim();
  const hasDescription = Boolean(description);
  const logoUrl = inputs.logoImage.url ?? undefined;
  const hasLogo = Boolean(logoUrl);

  const commonProps = {
    definition,
    description,
    hasDescription,
    priceText,
    title,
  };

  return (
    <div
      className={`template-canvas template-canvas--${variant}${
        hasLogo ? ' template-canvas--has-logo' : ''
      }`}
    >
      {inputs.backgroundImage.url ? (
        <div
          className="template-media"
          style={{ backgroundImage: `url("${inputs.backgroundImage.url}")` }}
        />
      ) : (
        <div className="template-media template-media--fallback">
          <div className="template-media__placeholder">
            <span>Add background</span>
            <strong>4:5 canvas</strong>
          </div>
        </div>
      )}

      <div className="template-noise" />
      <div className="template-vignette" />

      {hasLogo ? (
        <div className="template-logo">
          <img src={logoUrl} alt="Uploaded brand logo" />
        </div>
      ) : null}

      {renderVariant(variant, commonProps)}
    </div>
  );
}
